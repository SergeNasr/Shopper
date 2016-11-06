const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/postgres';

router.get('/', (req, res, next) => {
    res.sendFile(path.join(
        __dirname, '..', 'client', 'index.html'));
});

router.get('/api/v1/application', (req, res, next) => {
    const results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Select Data
        const query = client.query('SELECT * FROM application ORDER BY id ASC;');

        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

router.post('/api/v1/application', (req, res, next) => {
    const results = [];

    // Grab data from http request
    const data = {
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        phone: req.body.phone,
    };

    console.log(req.body);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {

        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query('INSERT INTO carrot_application(first, last, email, phone) values($1, $2, $3, $4)',
            [data.first, data.last, data.email, data.phone]);

        // SQL Query > Select Data
        const query = client.query('SELECT * FROM carrot_application ORDER BY id ASC');

        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

module.exports = router;