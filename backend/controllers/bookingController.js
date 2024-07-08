const db = require('../models')

const Booking = db.Booking

const addBooking = async (library_id,start_time,end_time,user_id,user_number,room_number,seat_number,total_payment) => {

    let info={
        library_id,
        start_time,
        end_time,
        user_id,
        user_number,
        room_number,
        seat_number,
        total_payment
    }

    const booking=await Booking.create(info);
    console.log("New Booking added >> ",booking);
    // return booking;
}

const getAll= async(req,res)=>{
    let bookings = await Booking.findAll({});
    res.status(200).send(bookings);
}

module.exports = {
    addBooking,getAll
}