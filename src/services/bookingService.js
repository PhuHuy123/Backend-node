import db from '../models/index'
import bcrypt from 'bcryptjs';
require('dotenv').config();
import _ from 'lodash';

let getCancelBook = (id) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameters!'
                })
            }
            else{
                let data = await db.Booking.findOne({
                    where: {id: id},
                    raw: false,
                });
                if(data){
                    await db.Examination.destroy({
                        where: {bookingId: data.id}
                    });
                    data.statusId = 'S4'
                    await data.save();
                }
            }
            resolve({
                errCode:0,
                message:'OK!',
            }) 
        } catch (e) {
            reject(e)
        }
    })
}

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
                    data = await db.Examination.findAll();
                }
                else{
                    data = await db.Examination.findAll({
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
let getBookingSingleId = (patientId) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!patientId) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameters!'
                })
            }
            else{
                let res = await db.Booking.findAll({
                    where: {
                        patientId: patientId,
                    },
                    include:[
                        {
                        model: db.Examination,
                        as: "dataBooking",
                        include: [
                            {
                                model: db.User,
                                as: "dataDoctor",
                                attributes: ["firstName","lastName"],
                                include: [
                                   {
                                    model: db.DoctorInfo,
                                    include: [
                                        {
                                         model: db.Specialty,
                                         as: "specialtyData",
                                         attributes: ["name"],
                                        },
                                        {
                                        model: db.Allcode,
                                        as: "priceTypeData",
                                        attributes: ["valueEn", "valueVi"],
                                        }
                                     ]
                                    }
                                ]
                            },
                            {
                                model: db.Allcode,
                                as: "timeTypeDataExamination",
                                attributes: ["valueEn", "valueVi"],
                            }
                        ]
                        },
                        {
                            model: db.Allcode,
                            as: "genderData2",
                            attributes: ["valueEn", "valueVi"],
                        }
                    ],
                    raw: false,
                });
                let data = res[res.length-1]
                resolve({
                    errCode:0,
                    // message:'OK!',
                    data
                }) 
            }
        } catch (e) {
            reject(e)
        }
    })
  }
module.exports = {
    getCancelBook:getCancelBook,
    getAllBooking:getAllBooking,
    getBookingSingleId,
}
