import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
require('dotenv').config();
import _ from 'lodash';
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHomeService = (limitInput) => {
    return new Promise(async (resolve, reject) =>{
         try {
            let user = await db.User.findAll({
                limit: limitInput,
                order: [['createdAt','DESC']],
                attributes:{
                    exclude: ['password']
                },
                where: {roleId: 'R2'},
                include: [
                    {model: db.Allcode, as: 'positionData', attributes:['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes:['valueEn', 'valueVi']}
                ],
                raw: true,
                nest: true,
            })
            resolve({
                errCode: 0,
                data: user
            });
        } catch (e) {
            reject(e);
        }
     })
}

let getAllDoctorsService = () => {
    return new Promise(async (resolve, reject) =>{
         try {
            let doctor = await db.User.findAll({
                attributes:{
                    exclude: ['password','image']
                },
                where: {roleId: 'R2'},
            })
            resolve({
                errCode: 0,
                data: doctor
            });
        } catch (e) {
            reject(e);
        }
     })
}
let createInfoDoctor = (data) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!data.doctorId || !data.contentHTML || !data.contentMarkdown || !data.action){
                resolve({
                    errCode: 1,
                    message: 'Missing parameters !'
                })
            }
            else{
                if(data.action === 'CREATE'){
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId : data.doctorId,
                    })
                }
                else{
                    if(data.action==="EDIT"){
                        let markdown = await db.Markdown.findOne({
                            where: {doctorId: data.doctorId},
                            raw:false
                        });
                        if(markdown){
                            markdown.contentHTML= data.contentHTML;
                            markdown.contentMarkdown= data.contentMarkdown;
                            markdown.description= data.description;
                            await markdown.save();
                        }
                    }
                }
                resolve({
                    errCode:0,
                    message:'OK! Create info'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getDetailDoctorById = (idInput) => {
    return new Promise(async (resolve, reject) =>{
         try {
             if(!idInput){
                 resolve({
                    errCode: 1,
                    message: 'Missing getDetailDoctorById parameters !'
                })
             }
            else{
                let data = await db.User.findOne({
                    where: {
                        id: idInput
                    },
                    attributes:{
                        exclude: ['password']
                    },
                    include: [
                        {model: db.Markdown, attributes:['description', 'contentHTML', 'contentMarkdown']},
                        {model: db.Allcode, as: 'positionData', attributes:['valueEn', 'valueVi']},
                    ],
                    raw: false,
                    nest: true,
                })
                if(data && data.image){
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if(!data) data ={};
                resolve({
                    errCode:0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
     })
}
let bulkCreateSchedule = (data) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!data.doctorId || !data.arrSchedule || !data.formatData){
                resolve({
                    errCode: 1,
                    message: 'Missing parameters !'
                })
            }else{
                let schedule = data.arrSchedule;
                if(schedule && schedule.length > 0){
                    schedule = schedule.map(item => {
                        item.maxNumber= MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                // get all existing data
                let existing = await db.Schedule.findAll({
                    where:{doctorId: data.doctorId, date: data.formatData},
                    attributes:['timeType', 'date','doctorId','maxNumber'],
                    raw:true
                })
                // convert to date
                if(existing && existing.length>0){
                    existing = existing.map(item => {
                        item.date = new Date(item.date).getTime();
                        return item;
                    })
                }

                // compare different 
                let toCreate = _.differenceWith(schedule, existing, (a,b)=>{
                    return a.timeType === b.timeType && a.date === b.date;
                })

                //create a new data 
                if(toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate)
                }
                resolve({
                    errCode:0,
                    message:'OK! Create info'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getScheduleDoctorByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) =>{
         try {
             if(!doctorId || !date) {
                 resolve({
                    errCode: 1,
                    message: 'Missing getScheduleDoctorByDate parameters !'
                })
             }
            else{
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    }
                    
                })
                if(!dataSchedule){
                    dataSchedule =[]
                }
                resolve({
                    errCode:0,
                    data: dataSchedule
                })
            }
        } catch (e) {
            reject(e);
        }
     })
}
module.exports = {
    getTopDoctorHomeService:getTopDoctorHomeService,
    getAllDoctorsService:getAllDoctorsService,
    createInfoDoctor:createInfoDoctor,
    getDetailDoctorById:getDetailDoctorById,
    bulkCreateSchedule:bulkCreateSchedule,
    getScheduleDoctorByDate:getScheduleDoctorByDate,
}
