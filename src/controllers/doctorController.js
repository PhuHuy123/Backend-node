import db from '../models/index'
import doctorService from '../services/doctorService'

let getTopDoctorHome= async(req, res)=>{
    let limit = req.query.limit
    if(!limit) limit =10;
    try {
        // +limit: de chuyen kieu string sang number
        let doctors = await doctorService.getTopDoctorHomeService(+limit);
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getAllDoctors = async(req, res)=>{
    try {
        let doctors = await doctorService.getAllDoctorsService();
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let postInfoDoctor = async(req, res)=>{
    try {
        let response = await doctorService.createInfoDoctor(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getDetailDoctorById = async(req, res)=>{
    try {
        let info = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let bulkCreateSchedule = async (req, res) => {
    try {
        let info = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getScheduleDoctorByDate = async (req, res) => {
    try {
        let data = await doctorService.getScheduleDoctorByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getExtraInfoDoctorById = async (req, res) => {
    try {
        let info = await doctorService.getExtraInfoDoctorById(req.query.doctorId);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
module.exports ={
    getTopDoctorHome:getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInfoDoctor:postInfoDoctor,
    getDetailDoctorById:getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate:getScheduleDoctorByDate,
    getExtraInfoDoctorById:getExtraInfoDoctorById,
}
