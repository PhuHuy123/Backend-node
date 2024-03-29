import clinicService from '../services/clinicService'
const cloudinary = require('cloudinary').v2;

let createNewClinic = async(req, res)=>{
    try {
        let info = await clinicService.createNewClinic(req.body, req.file?.path);
        if(info.errCode !==0){
            await cloudinary.uploader.destroy(req.file?.filename)
        }
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getAllClinic = async(req, res)=>{
    try {
        let info = await clinicService.getAllClinic();
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getDetailClinicById = async(req, res)=>{
    try {
        let info = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from getDetailSpecialtyById...'
        })
    }
} 
let deleteClinicById= async (req, res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1, 
            message: "Chua nhan duoc ID",
            users:[]
        })
    }
    let message = await clinicService.deleteClinicById(req.body.id)
    return res.status(200).json(message)
}
let editClinic = async(req, res)=> {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1, 
            message: "Chua nhan duoc thông tin",
        })
    }
    let message = await clinicService.editClinic(req.body, req.file?.path);
    if(message.errCode !==0){
        await cloudinary.uploader.destroy(req.file?.filename)
    }
    return res.status(200).json(message)
}
module.exports ={
    createNewClinic:createNewClinic,
    getAllClinic:getAllClinic,
    getDetailClinicById:getDetailClinicById,
    deleteClinicById:deleteClinicById,
    editClinic:editClinic,
}
