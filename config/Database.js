import pg from 'pg';

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'a',
    database: 'tubes',
    port: 5432,
});

export default pool;
