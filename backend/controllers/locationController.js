const db = require('../models')

const Location = db.location

const addLocation= async (req,res)=>{
    let info={
        name:req.body.name,
        pincode:req.body.pincode
    }

    const temp=await Location.create(info);
    res.status(200).send(temp);
}

const getAll=async(req,res)=>{
    const locations=await Location.findAll({});

    res.status(200).send(locations);
}

module.exports = {
    addLocation,getAll
}