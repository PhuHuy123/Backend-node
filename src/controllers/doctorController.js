import db from '../models/index'
import * as doctorService from '../services/doctorService'

let getTopDoctorHome= async(req, res)=>{
    let limit = req.query.limit
    if(!limit) limit =10;
    try {
        // +limit: de chuyen kieu string sang number
        let doctors = await doctorService.getTopDoctorHomeService(+limit);
        return res.status(200).json(doctors)
    } catch (e) {
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
    } catch (e) {        return res.status(200).json({
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
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getScheduleDoctorALL = async (req, res) => {
    try {
        let data = await doctorService.getScheduleDoctorALL(req.query.doctorId);
        return res.status(200).json(data)
    } catch (e) {
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
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getProfileDoctorById = async (req, res) => {
    try {
        let info = await doctorService.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(info)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getListPatientForDoctor = async (req, res) => {
    try {
        let info = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(info)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let sendRemedy = async (req, res) => {
    try {
        let info = await doctorService.sendRemedy(req.body);
        return res.status(200).json(info)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let deleteSchedule= async (req, res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1, 
            message: "Chua nhan duoc ID",
            users:[]
        })
    }
    let message = await doctorService.deleteSchedule(req.body.id)
    return res.status(200).json(message)
}
let getCancelAppointment= async (req, res)=>{
    try {
        let info = await doctorService.getCancelAppointment(req.body);
        return res.status(200).json(info)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let postDoctorForward = async(req, res)=>{
    try {
        let response = await doctorService.postDoctorForward(req.body);
        return res.status(200).json(response)
    } catch (e) {        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
export {
    getTopDoctorHome as getTopDoctorHome,
    getAllDoctors as  getAllDoctors,
    postInfoDoctor as postInfoDoctor,
    getDetailDoctorById as getDetailDoctorById,
    bulkCreateSchedule as  bulkCreateSchedule,
    getScheduleDoctorByDate as getScheduleDoctorByDate,
    getScheduleDoctorALL as getScheduleDoctorALL,
    getExtraInfoDoctorById as getExtraInfoDoctorById,
    getProfileDoctorById as getProfileDoctorById,
    getListPatientForDoctor as getListPatientForDoctor,
    sendRemedy as sendRemedy,
    deleteSchedule as deleteSchedule,
    getCancelAppointment as getCancelAppointment,
    postDoctorForward as postDoctorForward,
}
