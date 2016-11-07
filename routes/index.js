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
            return res.json(results[results.length - 1].id);
        });
    });
});

router.put('/api/v1/application/:id', (req, res, next) => {
    const results = [];

    // Grab data from the URL parameters
    const id = req.params.id;

    // Grab data from http request
    const data = {
        legalAge: req.body.legalAge,
        youLift: req.body.youLift,
        workPermit: req.body.workPermit,
        carOwner: req.body.carOwner
    };

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Update Data
        client.query('UPDATE carrot_application SET legal_age=($1), able_to_lift=($2), work_permit=($3), owns_car=($4) WHERE id=($5)',
            [data.legalAge, data.youLift, data.workPermit, data.carOwner, id]);

        // SQL Query > Select Data
        const query = client.query("SELECT * FROM carrot_application ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

module.exports = router;