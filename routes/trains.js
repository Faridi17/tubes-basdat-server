import express from 'express'
import { getAllTrains, getTrainById } from '../controllers/trains.js'

const router = express.Router()

router.get('/', getAllTrains)
router.get('/:trainId', getTrainById)

export default router