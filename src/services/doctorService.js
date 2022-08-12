import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

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
            if(!data.doctorId || !data.contentHTML || !data.contentMarkdown ){
                resolve({
                    errCode: 1,
                    message: 'Missing parameters !'
                })
            }
            else{
                await db.Markdown.create({
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description,
                    doctorId : data.doctorId,
                })
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
module.exports = {
    getTopDoctorHomeService:getTopDoctorHomeService,
    getAllDoctorsService:getAllDoctorsService,
    createInfoDoctor:createInfoDoctor,
    getDetailDoctorById:getDetailDoctorById
}
