import express from 'express'
import { createSchedule, getAllSchedule, getFutureSchedule } from '../controllers/schedules.js'
// import { adminOnly } from '../middleware/AuthUser'

const router = express.Router()

router.get('/', getAllSchedule)
router.get('/future', getFutureSchedule)
router.post('/', createSchedule)

export default router