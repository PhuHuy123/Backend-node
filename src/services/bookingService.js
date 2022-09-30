import db from '../models/index'
import bcrypt from 'bcryptjs';
require('dotenv').config();
import _ from 'lodash';

// let createNewClinic = (data) => {
//     return new Promise(async(resolve, reject) =>{
//         try {
//             if(!data.name || !data.address || !data.imageBase64 || !data.contentMarkdown || !data.contentHTML){
//                 resolve({
//                     errCode: 1,
//                     message: 'Missing parameters !'
//                 })
//             }
//             else{
//                 await db.Clinic.create({
//                     descriptionHTML: data.contentHTML,
//                     descriptionMarkdown: data.contentMarkdown,
//                     image: data.imageBase64,
//                     name : data.name,
//                     address: data.address
//                 })
//                 resolve({
//                     errCode:0,
//                     message:'OK! Create new Clinic'
//                 })     
//             }
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

let getAllBooking = (input) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!input) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameters!'
                })
            }
            else{
                let data = {};
                if(input === 'ALL'){                
                    data = await db.Booking.findAll();
                }
                else{
                    data = await db.Booking.findAll({
                        where: {doctorId: input}
                    });
                }
                resolve({
                    // errCode:0,
                    // message:'OK!',
                    data
                }) 
            }
        } catch (e) {
            reject(e)
        }
    })
}
// let getDetailClinicById = (inputId) => {
//     return new Promise(async(resolve, reject) =>{
//         try {
//             if(!inputId) {
//                 resolve({
//                     errCode: 1,
//                     message: 'Missing parameters!'
//                 })
//             }
//             else{
//                 let data = await db.Clinic.findOne({
//                     where: {
//                         id: inputId
//                     },
//                     attributes:['name', 'address', 'descriptionHTML','descriptionMarkdown']
//                 })
//                 if(data){
//                     let doctorClinic = [];
//                     doctorClinic = await db.DoctorInfo.findAll({
//                         where: {clinicId: inputId},
//                         attributes:['doctorId','provinceId']
//                     })
//                     data.doctorClinic = doctorClinic;
//                 }
//                 else data = {}

//                 resolve({
//                     errCode:0,
//                     message:'OK!',
//                     data
//                 })     
//             }
//         } catch (e) {
//             reject(e)
//         }
//     })
// }
module.exports = {
    // createNewClinic:createNewClinic,
    getAllBooking:getAllBooking,
    // getDetailClinicById:getDetailClinicById
}