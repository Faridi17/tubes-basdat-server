import connection from "../config/Database.js";

export const getAllTrains = async (req, res) => {
    try {
        const query = 'SELECT * FROM train';
        const { rows } = await connection.query(query);

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTrainById = async (req, res) => {
    try {
        const { trainId } = req.params;
        const query = 'SELECT * FROM train WHERE id_train = $1';
        const { rows } = await connection.query(query, [trainId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Train not found' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
