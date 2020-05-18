const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();



function rowToObject(row) {
	return {
		year: row.year,
		month: row.month, 
		day: row.day,
		course: row.course,
		weather: row.weather,
		holes: row.holes,
		score: row.score,
		id: row.id,
	};
}

app.get('/rounds/',(request, response) => {
	const query = 'SELECT year, month, day, course, weather, holes, score, id FROM rounds WHERE is_deleted = 0';
	const params = [request.params.year, request.params.month, request.params.day, request.params.course, request.params.weather, request.params.holes, request.params.score];
	connection.query(query, params, (error, rows) => {
		response.send({
			ok: true,
			rounds: rows.map(rowToObject),
		});
	});
});

app.post('/rounds', (request, response) => {
	const query = 'INSERT INTO rounds(year, month, day, course, weather, holes, score) values (?, ?, ?, ?, ?, ?, ?)';
	const params = [request.body.year, request.body.month, request.body.day, request.body.course, request.body.weather, 
		request.body.holes, request.body.score];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
			id: result.insertId,
		});
	});
});


app.patch('/rounds/:id', (request, response) => {
	const query = 'UPDATE rounds SET year = ?, month = ?, day = ?, course = ?, weather = ?, holes = ?, score = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
	const params = [request.body.year, request.body.month, request.body.day, request.body.course, request.body.weather, request.body.holes, request.body.score, request.params.id];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
		});
	});
});

app.delete('/rounds/:id', (request, response) => {
	const query = 'UPDATE rounds SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
	const params = [request.params.id];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
		});
	});
});

const port = 3443;
app.listen(port, () => {
	console.log(`we are live on port ${port}`);
});


