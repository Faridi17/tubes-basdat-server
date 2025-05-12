import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import pool from '../config/Database.js';

// Register function
export const register = async (req, res) => {
    try {
        const { email, password, firstname, lastname, age, gender, address } = req.body;
        const id_user = uuidv4()

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const query = `
            INSERT INTO users (id_user, email, password, firstname, lastname, age, gender, address)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        const values = [id_user, email, passwordHash, firstname, lastname, age, gender, address];

        await pool.query(query, values);

        res.status(201).json({ message: 'Register Berhasil' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await pool.query(query, [email]);

        const userLog = rows[0];

        if (!userLog) return res.status(404).json({ message: 'User tidak ditemukan' });

        const isMatch = await bcrypt.compare(password, userLog.password);
        if (!isMatch) return res.status(400).json({ message: 'Kata sandi salah' });

        const token = jwt.sign({ id: userLog.id_user }, process.env.JWT_SECRET);
        delete userLog.password;

        res.status(200).json({ token, userLog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};