import db from '../models/index'
import userService from '../services/userService'

let handleLogin= async(req, res)=> {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(500).json({
            errCode: 10, 
            message: "Khong hop le!"
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user?userData.user:{},
    })
}
let handleUpdatePassword = async(req, res)=> {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1, 
            message: "Chua nhan duoc ID",
        })
    }
    let data = await userService.handleUpdatePassword(req.body);
    return res.status(200).json(data)
}
let handleCheckEmail = async(req, res)=> {
    let email = req.body.email;
    if(!email){
        return res.status(500).json({
            errCode: 10, 
            message: "Khong hop le!"
        })
    }
    let userData = await userService.handleCheckEmail(email)
    return res.status(200).json({userData})
}
let handleGetAllUsers = async(req, res)=>{
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode: 1, 
            message: "Chua nhan duoc ID",
            users:[]
        })
    }
    
    let users = await userService.getAllUsers(id)
    return res.status(200).json({
        errCode: 0, 
        message: "OK",
        users
    })
   
}

let handleCreateNewUser = async (req, res)=>{
    
    let message = await userService.getNewUsers(req.body)
    return res.status(200).json(message)
}

let handleEditUser = async (req, res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1, 
            message: "Chua nhan duoc ID",
            users:[]
        })
    }

    let message = await userService.getUserInfoById(req.body.id)
    return res.status(200).json(message)
}

let handleUpdateUser = async(req, res)=> {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1, 
            message: "Chua nhan duoc ID",
        })
    }
    let message = await userService.updateUser(req.body);
    return res.status(200).json(message)
}

let handleDeleteNewUser= async (req, res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1, 
            message: "Chua nhan duoc ID",
            users:[]
        })
    }
    let message = await userService.deleteUsers(req.body.id)
    return res.status(200).json(message)
}
let getAllCode = async (req, res)=>{
    try {
        let data = await userService.getAllCodeService(req.query.type)
        return res.status(200).json(data)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server",
        })
        
    }
    
}
let resetTokenPassword = async (req, res)=>{
    let email = req.body.email;
    if(!email){
        return res.status(500).json({
            errCode: 10, 
            message: "Khong hop le!"
        })
    }
    let userData = await userService.resetTokenPassword(email)
    return res.status(200).json({userData})
    
}
module.exports ={
    handleLogin:handleLogin,
    handleUpdatePassword:handleUpdatePassword,
    handleCheckEmail: handleCheckEmail,
    handleGetAllUsers:handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleUpdateUser: handleUpdateUser,
    handleDeleteNewUser: handleDeleteNewUser,
    getAllCode: getAllCode,
    resetTokenPassword:resetTokenPassword,
    
}

