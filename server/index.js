const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password: "root",
    database : "primenumber"
})

app.get('/primenumber', (req, res) => {
    db.query("SELECT * FROM primenumber", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/create', (req, res) => {
    const start = req.body.start;
    const end = req.body.end;

    db.query
    ("INSERT INTO primenumber (start, end) VALUES(?,?)", 
    [start, end]);
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
    }
    }
})

app.listen('3001', () => {
    console.log('Server is running on port 3001');
})
