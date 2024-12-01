import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import authRoute from './routes/auth.js'
import ticketRoute from './routes/ticket.js'
import scheduleRoute from './routes/schedules.js'
import trainRoute from './routes/trains.js'
import orderRoute from './routes/orders.js'
import { register } from './controllers/auth.js'
import { checkSchedule } from './controllers/schedules.js'
// import { checkTicket } from './controllers/tickets.js'

const app = express()
dotenv.config()
app.use(express.json())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.post('/auth/register', register)

app.use('/auth', authRoute) 
app.use('/schedules', scheduleRoute)
app.use('/trains', trainRoute)
app.use('/tickets', ticketRoute)
app.use('/orders', orderRoute)

const checkScheduleTicket = (c) => {
    const fMinute = 60 * 1000
    const currentDate = new Date()
    const call = fMinute - (((((currentDate.getMinutes() * 60) % 2) + currentDate.getSeconds()) * 1000) - currentDate.getMilliseconds())
    setTimeout(() => {
        c()
        setInterval(c, fMinute)
    }, call)
}

// checkScheduleTicket(() => { 
//     checkTicket()
//     checkSchedule()
// })

app.listen(process.env.APP_PORT, () => {
    console.log(`Server up and running at port ${process.env.APP_PORT}...`); 
})
