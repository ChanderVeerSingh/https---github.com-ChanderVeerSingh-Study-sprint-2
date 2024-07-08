const db = require('../models');
const seatController=require('../controllers/seatController.js');

// create main Model
const Room = db.room;
const Seat=db.seat;

const addRoom=async(req,res)=>{
    const info={
        library_id:req.body.library_id,
        room_number:req.body.room_number,
        total_seats:req.body.total_seats,
        is_ac_room:req.body.is_ac_room,
    }

    const obj=await Room.create(info);
    console.log("Room is created>>",obj);
    for(let i=1;i<=info.total_seats;i++){
        const seat=await seatController.addSeat(i,obj.id,info.library_id,req.body.price);
    }

    res.status(200).send(obj);
    
}

const getRoom=async(req,res)=>{
    const {id}=req.params;
    console.log("req params ",req.params);
    console.log("library_id>>",id);
    const rooms=await Room.findAll({where:{library_id:id}});

    let ans=[];
  
    for(let i=0;i<rooms.length;i++){
        let seats=await seatController.seatByRoom(rooms[i].id);
        ans.push({room:rooms[i],seats:seats});
    }

    res.status(200).send(ans);

}


const getAll=async(req,res)=>{
    let obj=await Room.findAll({});
    res.status(200).send(obj);
}

module.exports={
    addRoom,getAll,getRoom
}