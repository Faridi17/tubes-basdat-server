import pg from 'pg';

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'a',
    database: 'kereta',
    port: 5432,
});

export default pool;