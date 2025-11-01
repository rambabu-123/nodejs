const Employee = require('../models/Employee');

const createEmployee = async (req,res) =>{
    try{
  const {id,name,email,phoneNumber,city} = req.body; 
   const employee = new Employee({
    id,
    name,
    email,
    phoneNumber,
    city
   })
  await employee.save();
  res.status(201).json(employee);
}

    catch(err){
        res.status(500).json({message:"servereEror"})
        console.log("error in creating employee", err);
    }
}

const getEmployees = async (req,res) => {
    try{
        const employees = await Employee.find();
        res.status(200).json(employees);
    }
    catch(err){
        res.status(500).json({message:"serverError"})
        console.log("error in fetching employees", err);
    }
}

const singleEmployee = async (req,res) =>{
    try{
        const employee =  await Employee.findById(req.params.id);
        res.status(200).json({message:"employee data fetched successfully",data:employee});

        if(!empId){
            res.status(400).json({message:"employee id is required"});
        }
    }catch(err){
        res.status(500).json({message:"serverError"})
    }
}

const updateEmployee = async(req,res) =>{
    try{
        const {id,name,email,phonenumber,city} = req.body;
        const myemployee = await Employee.findByIdAndUpdate(req.params.id,{
            id,
            name,
            email,
            phonenumber,
            city
        });
        if(!myemployee){
            return res.status(404).json({message:"employee not found"});
        }
        res.status(200).json({message:"employee updated successfully",data:myemployee});
    }catch(err){
        res.status(500).json({message:"serverError"})
    }
}
const deleteEmployee = async(req,res) =>{
    try{
        const deleteEmployee  = await Employee.findByIdAndDelete(req.params.id);
        if(!deleteEmployee){
            return res.status(404).json({message:"employee not found"});
        }
        res.status(200).json({message:"employee deleted successfully",data:deleteEmployee});
    }catch(err){
        res.status(500).json({message:"serverError"})
    }
}

module.exports = {createEmployee,getEmployees,singleEmployee,updateEmployee,deleteEmployee};