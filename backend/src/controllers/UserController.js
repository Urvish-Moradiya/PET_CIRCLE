const userModel = require("../models/UserModel")
const getAllUser = async(req,res) => {

    const users = await userModel.find()
    res.json({
        message:"role fetched successfully",
        data:users
    })
};

const addUser = async(req,res)=>{
  try{
    const savedUser = await userModel.create(req.body)
    res.json({
        message:"user created...",
        data:savedUser
  })
  }catch(err){
    res.status(500).json({
    message:"error",
    data:err
    })
}
}

const deleteUser = async(req,res)=>{
      const deletedUser = await userModel.findByIdAndDelete(req.params.id)
      res.json({
        message:"user deleted successfully..",
        data:deletedUser
      })
}

  const getUserById = async (req,res)=>{
    //req.params.id
    const foundUser = await userModel.findById(req.params.id)
    res.json({
      message:"role fetched..",
      data:foundUser
    })
  }

module.exports = {
    getAllUser,addUser,deleteUser,getUserById
  };