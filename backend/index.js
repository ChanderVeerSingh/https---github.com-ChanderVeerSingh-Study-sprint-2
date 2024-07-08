const express = require('express')
const cors = require('cors')
const libraryRoutes=require('./routes/libraryRoutes.js');
const roomRoutes=require('./routes/roomRoutes.js');
const paymentRoutes=require('./routes/paymentRoutes.js')
const locationRoutes=require('./routes/locationRoutes.js');
const timeIntervalRoutes=require('./routes/timeeIntervalRoutes.js');
const app = express();

// middleware

app.use(cors());
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// routers
app.use('/library',libraryRoutes);
app.use('/room',roomRoutes);
app.use('/payment',paymentRoutes);
app.use('/location',locationRoutes);
app.use('/time-interval',timeIntervalRoutes);

const PORT =  3001;

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})