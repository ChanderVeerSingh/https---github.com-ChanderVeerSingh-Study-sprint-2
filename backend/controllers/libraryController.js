const db = require('../models')

const Library = db.library

const addLibrary = async (req, res) => {
    
    let info={
        name:req.body.name,
        location_id:req.body.location_id,
        facilities: req.body.facilities,
        image: req.body.image,
        gmap_coordinates: req.body.gmap_coordinates,
        poc_name: req.body.poc_name,
        poc_number: req.body.poc_number
    }

    const library = await Library.create(info);
    console.log(library);
    res.status(200).send(library);
}

const getAll=async(req,res)=>{
    let libraries = await Library.findAll({});
    res.status(200).send(libraries);
}

const getOne=async(req,res)=>{
    let {id}=req.params;
    console.log("id>>",id);
    let library=await Library.findOne({where:{id:id}});
    console.log("library >>",library);
    res.status(200).send(library);
}

module.exports = {
    addLibrary,
    getAll,
    getOne
}