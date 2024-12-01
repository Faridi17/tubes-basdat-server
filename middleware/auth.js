import connection from '../config/Database.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const verifyUser = async(req, res, next) => {
    try {
        let token = req.header('Authorization')

        if(!token) return res.status(403).send('Akses Ditolak')

        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const adminOnly = async(req, res, next) => {
    const idUser = req.query
    const query = `SELECT * FROM users WHERE user_id=${idUser}`
    const user = await (await connection).execute(query)

    if(!user) return res.status(404).json({ msg: 'User tidak ditemukan' })
    if(user.role !== 'admin') return res.status(403).json({ msg: 'Akses terlarang' })
    next()
}
