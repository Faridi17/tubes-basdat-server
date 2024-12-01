import pool from '../config/Database.js';

export const createTicket = async (req, res) => {
    const { price, id_schedule, id_train } = req.body;

    try {
        const query = `INSERT INTO ticket (price, id_schedule, id_train) VALUES ($1, $2, $3)`;
        await pool.query(query, [price, id_schedule, id_train]);

        res.status(201).json({ message: 'Berhasil membuat tiket' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTicket = async (req, res) => {
    try {
        const query = `
        SELECT t.id_ticket, t.price, t.status_ticket, t.stock, 
               TO_CHAR(s.time_start, 'HH24:MI') AS time_start, 
               TO_CHAR(s.time_end, 'HH24:MI') AS time_end, 
               s.from_station, s.to_station, tr.id_train
        FROM ticket t
        JOIN schedule s ON t.id_schedule = s.id_schedule
        JOIN train tr ON t.id_train = tr.id_train
        `;
        const { rows } = await pool.query(query);

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTicketById = async (req, res) => {
    const { ticketId } = req.params;

    try {
        const query = `
        SELECT t.id_ticket, t.price, t.status_ticket, t.stock, 
               TO_CHAR(s.time_start, 'HH24:MI') AS time_start, 
               TO_CHAR(s.time_end, 'HH24:MI') AS time_end, 
               s.from_station, s.to_station, tr.id_train
        FROM ticket t
        JOIN schedule s ON t.id_schedule = s.id_schedule
        JOIN train tr ON t.id_train = tr.id_train
        WHERE t.id_ticket = $1
        `;
        const { rows } = await pool.query(query, [ticketId]);

        if (rows.length === 0) return res.status(404).json({ message: 'Tiket tidak ditemukan' });

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTicketToday = async (req, res) => {
    try {
        const query = `
        SELECT t.id_ticket, t.price, t.status_ticket, 
               TO_CHAR(s.time_start, 'HH24:MI') AS time_start, 
               TO_CHAR(s.time_end, 'HH24:MI') AS time_end, 
               s.from_station, TO_CHAR(s.time_end, 'DD Mon YYYY') AS date_time, 
               s.to_station, tr.id_train
        FROM ticket t
        JOIN schedule s ON t.id_schedule = s.id_schedule
        JOIN train tr ON t.id_train = tr.id_train
        WHERE DATE(s.time_start) = CURRENT_DATE AND s.time_start > CURRENT_TIMESTAMP
        `;
        const { rows } = await pool.query(query);

        if (rows.length === 0) return res.status(404).json({ message: 'Tiket tidak ditemukan' });

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};