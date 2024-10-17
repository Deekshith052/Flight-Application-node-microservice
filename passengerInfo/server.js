const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');

const app = express();
app.PORT = 3003;

app.use(express.json());

app.listen(app.PORT, () => {
    console.log(`Server is running on port ${app.PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass@word1',
    database: 'passengersdb'
});

app.get('/passengers', (req,res) => {
    const sql = 'SELECT * FROM passengers';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/passengers', (req, res) => {
    const {id, name, email, flightId } = req.body;
    const sql = 'INSERT INTO passengers VALUES (?, ?, ?, ?)'; 
    db.query(sql, [id, email, flightId], (err, result) => {
        if (err) throw err;
        res.send('Passenger added successfully');
    });
});

app.get('/passengers/:id', (req, res) => {
    const sql = 'SELECT * FROM passengers WHERE id = ?';
    db.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/passengers/flights/:flightId', (req,res) => {
    const sql = 'SELECT * FROM passengers WHERE flightId = ?';
    db.query(sql, req.params.flightId, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})