import connection from "../config/Database.js";

export const createSchedule = async (req, res) => {
    const { time_start, time_end, from_station, to_station } = req.body;

    try {
        const query = `INSERT INTO schedule (time_start, time_end, from_station, to_station) VALUES ($1, $2, $3, $4)`;
        await connection.query(query, [time_start, time_end, from_station, to_station]);

        res.status(201).json({ message: 'Jadwal berhasil dibuat' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllSchedule = async (req, res) => {
    try {
        const query = 'SELECT * FROM schedule';
        const { rows } = await connection.query(query);

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFutureSchedule = async (req, res) => {
    try {
        const query = "SELECT * FROM schedule WHERE status_schedule = 'future'";
        const { rows } = await connection.query(query);

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const checkSchedule = async () => {
    try {
        console.log('Cek jadwal berhasil');
    } catch (error) {
        console.log('error: ', error.message);
    }
};
