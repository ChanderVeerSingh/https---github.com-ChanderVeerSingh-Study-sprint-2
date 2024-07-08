// const moment = require('moment');
const db = require('../models')

const TimeInterval = db.timeInterval;
const Room=db.room;
const seatConntroller=require('../controllers/seatController.js');
const slotSeatController=require('../controllers/slotSeatController.js');

const addTimeInterval=async(req,res)=>{
    let ans=[];
    let library_id=req.body.library_id;
    for(let i=6;i<=23;i++){
        let timeInterval=await TimeInterval.create({library_id:library_id,start_time:i});
        const allSeats=await seatConntroller.seatByLibrary(library_id);
        let seats=[];
        for(let j=0;j<allSeats.length;j++){
            const seat=await slotSeatController.addSeat(library_id,allSeats[j].room_id,allSeats[j].id,timeInterval.id,allSeats[j].price,allSeats[j].seat_number);
            seats.push(seat);
        }
        ans.push({time:timeInterval,seats});
    }

    res.status(200).send(ans);
}

const allTimeInterval=async(req,res)=>{
    console.log("req>>",req.params.id);
    console.log("req>>Full,",req.params);

    const allTimeIntervals=await TimeInterval.findAll({where:{library_id:req.params.id}});
    let ans=[];

    for(let i=0;i<allTimeIntervals.length;i++){
        let seats=await slotSeatController.getSeatByTimeinterval(allTimeIntervals[i].id);
    
        ans.push({time:allTimeIntervals[i],seat:seats});
    }
    res.status(200).send(ans);
}



module.exports={
    addTimeInterval,
    allTimeInterval
}