const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/postgres';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
    'CREATE TABLE carrot_application(' +
    'id SERIAL PRIMARY KEY,' +
    'first VARCHAR(40) not null, ' +
    'last VARCHAR(40) not null, ' +
    'email VARCHAR(40) not null, ' +
    'phone VARCHAR(40) not null, ' +
    'legal_age BOOLEAN default FALSE,' +
    'able_to_lift BOOLEAN default FALSE,' +
    'work_permit BOOLEAN default FALSE,' +
    'complete BOOLEAN default FALSE)');
query.on('end', function () { client.end(); });
