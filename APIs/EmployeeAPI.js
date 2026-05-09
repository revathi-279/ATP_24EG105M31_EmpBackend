import exp from 'express'
import {EmployeeModel } from '../models/EmployeeModel.js'
export const empApp = exp.Router()

//EMPLOYEE ROUTES

// CREATE EMPLOYEE

empApp.post('/employees', async (req, res) => {
    //get new product obj from req
    const newEmp = req.body
    //Create new product document
    const newEmpDocument = new EmployeeModel(newEmp)
    //save
    const result = await newEmpDocument.save()
    console.log("result: ", result)
    //send res
    res.status(201).json({ message: "Employee created" })
})

//GET ALL EMPLOYEES
empApp.get('/employees', async (req, res) => {
    //Read all the products from DB
    let employeeList = await EmployeeModel.find()
    //send res
    res.status(200).json({ message: "All employees", payload: employeeList })
})


//d. Update a product by productId
empApp.put('/employees/:id', async (req, res) => {
    //Read product id from req body
    const eid = req.params.id
    //get new product obj from req
    const modifiedEmployee=req.body
    //find product by productId
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(eid, modifiedEmployee, { new: true })
    //check if product not found
    if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" })
    }
    //send res
    res.status(200).json({ message: "Employee modified", payload: updatedEmployee })
})

//e. Delete a product by productId
empApp.delete('/employees/:id',async (req,res)=>{
    //Read product if from req body
    const eid  = req.params.id
    //find product by productId
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(eid)
    //check if product not found
    if(!deletedEmployee){
        return res.status(404).json({message:"Employee not found"})
    }
    //send res
    res.status(200).json({message:"Employee deleted",payload:deletedEmployee})
})
