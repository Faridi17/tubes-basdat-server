import express from 'express'
import { createTicket, getAllTicket, getTicketById, getTicketToday } from "../controllers/tickets.js";
// import { adminOnly } from "../middleware/AuthUser.js";

const router = express.Router()

router.get('/', getAllTicket)
router.get('/today', getTicketToday)
router.get('/:userId', getTicketById)
router.post('/', createTicket)

export default router