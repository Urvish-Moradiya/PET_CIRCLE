const PetModel = require("../models/PetModel");

const addPet = async(req,res) =>{
    console.log("Pet Added Successfull");
    try{
        const{animalType, breed, petName,...rest} = req.body;
        const newPet = {
            ...rest,animalType,breed,petName,
        };
        const createPet = await PetModel.create(newPet);
        res.status(201).json({
            message: "pet created successfully",
            data:createPet,

        });    
    } catch(err){
        res.status(500).json({
            message: "server error",
            error: err.message ,
        });
    }
}

module.exports ={
    addPet
};