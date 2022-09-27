import db from '../models/index'
import bcrypt from 'bcryptjs';
require('dotenv').config();
import _ from 'lodash';
import emailService from './emailService'
import { v4 as uuidv4 } from 'uuid'

let buildUrlEmail = (doctorId, token)=>{
    let res = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return res
}

let postBookAppointment = (data) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!data.doctorId || !data.email || !data.phoneNumber || !data.timeType || !data.date || !data.firstName || !data.lastName
                || !data.selectedGender || !data.address
                ){
                resolve({
                    errCode: 1,
                    message: 'Missing parameters !'
                })
            }
            else{
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.firstName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    phoneNumber: data.phoneNumber,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })

                let user = await db.User.findOrCreate({
                    where: {email: data.email},
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.firstName,
                        phoneNumber: data.phoneNumber,
                    }
                });
                if(user && user[0]){
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                            timeType:  data.timeType,
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType:  data.timeType,
                            token: token
                        }
                    });
                }
                resolve({
                    errCode:0,
                    message:'OK! Save info patient successfully'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let postVerifyBookAppointment = (data) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!data.doctorId || !data.token){
                resolve({
                    errCode: 1,
                    message: 'Missing parameters !'
                })
            }
            else{
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if(appointment){
                    appointment.statusId = 'S2';
                    await appointment.save();
                    
                    resolve({
                        errCode:0,
                        message:'OK! Save info patient successfully'
                    })
                }
                else{
                    resolve({
                        errCode:2,
                        message:"Update the appointment succeed!"                     
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
let postVerifyPaypal = (data) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!data.doctorId || !data.email || !data.phoneNumber || !data.timeType || !data.date || !data.firstName || !data.lastName
                || !data.selectedGender || !data.address
                ){
                resolve({
                    errCode: 1,
                    message: 'Missing parameters !'
                })
            }
            else{

                let user = await db.User.findOne({
                    where: {email: data.email},

                });
                if(user){
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user.id,
                            timeType:  data.timeType,
                        },
                        defaults: {
                            statusId: 'S2',
                            doctorId: data.doctorId,
                            patientId: user.id,
                            date: data.date,
                            timeType:  data.timeType,
                        }
                    });
                }
                resolve({
                    errCode:0,
                    message:'OK! Save info patient successfully'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment:postVerifyBookAppointment,
    postVerifyPaypal:postVerifyPaypal,
}
