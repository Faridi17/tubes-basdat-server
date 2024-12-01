import pool from '../config/Database.js';

export const createOrder = async (req, res) => {
    const { payment_method, id_user, id_ticket } = req.body;

    try {
        const query = `
            INSERT INTO orders (payment_method, id_user, id_ticket)
            VALUES ($1, $2, $3)
        `;
        await pool.query(query, [payment_method, id_user, id_ticket]);

        res.status(201).json({ message: 'Order berhasil' });
    } catch (error) {
        try {
            const query = `
                INSERT INTO orders (payment_method, status_order, id_user, id_ticket)
                VALUES ($1, 'failed', $2, $3)
            `;
            await pool.query(query, [payment_method, id_user, id_ticket]);
        } catch (innerError) {
            console.error('Error logging failed order:', innerError.message);
        }
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const query = 'SELECT * FROM orders';
        const { rows } = await pool.query(query);

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const query = `
            SELECT 
                o.id_order, 
                TO_CHAR(o.date_order, 'HH24:MI DD Mon YYYY') AS order_date, 
                o.payment_method, 
                o.status_order, 
                o.id_user, 
                t.id_ticket, 
                t.price, 
                t.status_ticket, 
                TO_CHAR(s.time_start, 'HH24:MI') AS time_start, 
                TO_CHAR(s.time_end, 'HH24:MI') AS time_end, 
                s.from_station, 
                TO_CHAR(s.time_end, 'DD Mon YYYY') AS date_time, 
                s.to_station, 
                tr.id_train
            FROM 
                ticket t 
                JOIN schedule s ON t.id_schedule = s.id_schedule
                JOIN train tr ON t.id_train = tr.id_train
                JOIN orders o ON t.id_ticket = o.id_ticket
            WHERE 
                o.id_user = $1
            ORDER BY 
                o.date_order DESC
        `;

        // Execute the query with the userId as a parameter
        const result = await pool.query(query, [userId]);

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};