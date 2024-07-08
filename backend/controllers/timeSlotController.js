const db = require('../models')

// create main Model
const time_slot = db.time_slot

const addTimeSlot = async (req, res) => {

    let info={
        slot_id:req.body.slot_id,
        library_id: req.body.library_id,
        start_time:req.body.start_time,
        end_time: req.body.end_time,
    }
   
    const obj = await time_slot.create(info);
    console.log("Time Schedule is created >> ",obj);
    res.status(200).send(obj);
    
    
}

const getAll=async(req,res)=>{
    let timeSlots = await time_slot.findAll({});
    res.status(200).send(timeSlots);
}

module.exports = {
    addTimeSlot,
    getAll
}

// const updateSeatAvailablityAndPrice=async(req,res)=>{
//     let timeSlots=await TimeSchedule.findOne({where:{id:req.body.id}});
//     timeSlots=req.body;
    
// }