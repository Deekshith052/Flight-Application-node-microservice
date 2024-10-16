const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');

const app = express();
app.PORT = 3001;

app.use(express.json());

app.listen(app.PORT, () => {
    console.log(`Server is running on port ${app.PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass@word1',
    database: 'airlinesdb'
});

app.get('/airlines', (req, res) => {
    const sql = 'SELECT * FROM airline';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/airlines/:id', (req, res) => {
    const sql = `SELECT * FROM airline WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.get('/airlines/:id/flights', (req, res) => {
    axios.get(`http://localhost:3002/flights/airline${req.params.id}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    
});

app.post('/airlines',(req,res) => {
    const {id, name, headquaters, tier} = req.body;
    const sql = `INSERT INTO airline (id, name, numOfFlights) VALUES (?,?,?);`;
    db.query(sql, [req.body.id, req.body.name, req.body.headquaters, req.body.tier], (err, result) => {
        {
            if (err) {
              res.status(500).json({ error: 'Error creating airline' });
            } else {
              res.status(201).json({ message: 'Airline created successfully' });
            }
          }
    });
});
