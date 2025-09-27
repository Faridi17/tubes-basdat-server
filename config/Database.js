import pg from 'pg';

const pool = new pg.Pool({
    host: '192.168.43.3',
    user: 'postgres',
    password: 'a',
    database: 'kereta',
    port: 5432,
});

export default pool;