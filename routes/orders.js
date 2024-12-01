import express from 'express'
import { createOrder, getAllOrders, getOrderByUser } from '../controllers/orders.js'

const router = express.Router()

router.get('/', getAllOrders)
router.get('/:userId', getOrderByUser)
router.post('/', createOrder)

export default router