import db from '../models/index'
import bcrypt from 'bcryptjs';
require('dotenv').config();
import _ from 'lodash';

let createNewClinic = (data) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!data.name || !data.	address || !data.imageBase64 || !data.contentMarkdown || !data.contentHTML){
                resolve({
                    errCode: 1,
                    message: 'Missing parameters !'
                })
            }
            else{
                await db.Clinic.create({
                    descriptionHTML: data.contentHTML,
                    descriptionMarkdown: data.contentMarkdown,
                    image: data.imageBase64,
                    name : data.name,
                    address: data.address
                })
                resolve({
                    errCode:0,
                    message:'OK! Create new Clinic'
                })     
            }
        } catch (e) {
            reject(e)
        }
    })
}

// let getAllSpecialty = () => {
//     return new Promise(async(resolve, reject) =>{
//         try {
//             let data = await db.Specialty.findAll();
//             if(data && data.length > 0) {
//                 data.map(item =>{
//                     item.image = new Buffer(item.image, 'base64').toString('binary');
//                     return item;
//                 })
//             }
//             resolve({
//                 errCode:0,
//                 message:'OK!',
//                 data
//             })     
//         } catch (e) {
//             reject(e)
//         }
//     })
// }
// let getDetailSpecialtyById = (inputId, location) => {
//     return new Promise(async(resolve, reject) =>{
//         try {
//             if(!inputId || !location) {
//                 resolve({
//                     errCode: 1,
//                     message: 'Missing parameters!'
//                 })
//             }
//             else{
//                 let data = await db.Specialty.findOne({
//                     where: {
//                         id: inputId
//                     },
//                     attributes:['descriptionHTML','descriptionMarkdown']
//                 })
//                 if(data){
//                     let doctorSpecialty = [];
//                     if(location === 'ALL'){
//                         doctorSpecialty = await db.DoctorInfo.findAll({
//                             where: {specialtyId: inputId},
//                             attributes:['doctorId','provinceId']
//                         })
//                     }
//                     else{
//                         doctorSpecialty = await db.DoctorInfo.findAll({
//                             where: {specialtyId: inputId,
//                                     provinceId: location
//                             },
//                             attributes:['doctorId','provinceId']
//                         })
//                     }
//                     data.doctorSpecialty = doctorSpecialty;
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
    createNewClinic:createNewClinic,
    // getAllSpecialty:getAllSpecialty,
    // getDetailSpecialtyById:getDetailSpecialtyById
}
