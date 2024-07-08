const db = require('../models')

const Seat=db.seat;

const addSeat=async(seat_number,room_id,library_id,price)=>{
    const seat=await Seat.create({
        seat_number,room_id,library_id,slot_1:false,slot_2:false,slot_3:false,slot_4:false,price
    });

    // return seat;
}

const makeSeatOccupied = async(seat_id,slot_id)=>{
    

    const seat=await Seat.findOne({where:{id:seat_id}});
    if(slot_id==1){
        seat.slot_1=true;
    }else if(slot_id==2){
        seat.slot_2=true;
    }else if(slot_id==3){
        seat.slot_3=true;
    }else{
        seat.slot_4=true;
    }

    await seat.save();
    
}

const seatByRoom=async(room_id,)=>{
    const seats=await Seat.findAll({where:{room_id:room_id}});
    return seats;
}

const seatByLibrary=async(library_id)=>{
    const seats=await Seat.findAll({where:{library_id:library_id}});
    return seats;
}

module.exports={
    addSeat,
    makeSeatOccupied,
    seatByRoom,
    seatByLibrary
}