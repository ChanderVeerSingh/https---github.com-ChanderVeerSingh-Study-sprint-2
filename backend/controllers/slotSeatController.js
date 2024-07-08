const db = require('../models')

const SlotSeat = db.slotSeat;
const TimeInterval=db.timeInterval;

const addSeat=async(library_id,room_id,seat_id,time_interval_id,price,seat_number)=>{
    const seat=await SlotSeat.create({library_id,room_id,seat_id,time_interval_id,price,is_available:true,seat_number});
    return seat;
}

const makeSeatOccupied=async(start_time,end_time,library_id,seat_number)=>{
    for(let i=start_time;i<=end_time;i++){
        const timeInterval=await TimeInterval.findOne({where:{library_id:library_id,start_time:i}});
        const seat=await SlotSeat.findOne({where:{time_interval_id:timeInterval.id,seat_number:seat_number}});
        seat.is_available=false;
        await seat.save();
        console.log("Seat is occupied now>>>",seat);
    }
}
const getSeatByTimeinterval=async(time_interval_id)=>{
    const seatsByTimeInterval=await SlotSeat.findAll({where:{time_interval_id:time_interval_id}});
    return seatsByTimeInterval;
}

module.exports={
    addSeat,
    getSeatByTimeinterval,
    makeSeatOccupied
}
