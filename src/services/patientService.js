import db from '../models/index'
import bcrypt from 'bcryptjs';
require('dotenv').config();
import _ from 'lodash';
import emailService from './emailService'

let postBookAppointment = (data) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!data.doctorId || !data.email || !data.timeType || !data.date){
                resolve({
                    errCode: 1,
                    message: 'Missing parameters !'
                })
            }
            else{
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: 'Nguyễn Phú Huy',
                    time: '8:00 - 9:00 ',
                    doctorName: "abc",
                    redirectLink: 'http://localhost:3000/home'
                })

                let user = await db.User.findOrCreate({
                    where: {email: data.email},
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
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
}
