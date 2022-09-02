import clinicService from '../services/clinicService'

let createNewClinic = async(req, res)=>{
    try {
        let info = await clinicService.createNewClinic(req.body);
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
module.exports ={
    createNewClinic:createNewClinic,
    getAllClinic:getAllClinic,
    getDetailClinicById:getDetailClinicById
}
