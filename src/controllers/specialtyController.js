import specialtyService from '../services/specialtyService'

let createNewSpecialty = async(req, res)=>{
    try {
        let info = await specialtyService.createNewSpecialty(req.body, req.file?.path);
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
let getAllSpecialty = async(req, res)=>{
    try {
        let info = await specialtyService.getAllSpecialty();
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getDetailSpecialtyById = async(req, res)=>{
    try {
        let info = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from getDetailSpecialtyById...'
        })
    }
}
let deleteSpecialtyById= async (req, res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1, 
            message: "Chua nhan duoc ID",
            users:[]
        })
    }
    let message = await specialtyService.deleteSpecialtyById(req.body.id)
    return res.status(200).json(message)
}
let editSpecialty = async(req, res)=> {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1, 
            message: "Chua nhan duoc thông tin",
        })
    }
    let message = await specialtyService.editSpecialty(req.body, req.file?.path);
    if(message.errCode !==0){
        await cloudinary.uploader.destroy(req.file?.filename)
    }
    return res.status(200).json(message)
}
module.exports ={
    createNewSpecialty:createNewSpecialty,
    getAllSpecialty:getAllSpecialty,
    getDetailSpecialtyById:getDetailSpecialtyById,
    deleteSpecialtyById:deleteSpecialtyById,
    editSpecialty:editSpecialty,
}
