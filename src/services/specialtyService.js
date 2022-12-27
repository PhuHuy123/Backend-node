import db from '../models/index'
import bcrypt from 'bcryptjs';
require('dotenv').config();
import _ from 'lodash';

let createNewSpecialty = (data) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!data.name || !data.imageBase64 || !data.contentMarkdown || !data.contentHTML){
                resolve({
                    errCode: 1,
                    message: 'Missing parameters !'
                })
            }
            else{
                await db.Specialty.create({
                    descriptionHTML: data.contentHTML,
                    descriptionMarkdown: data.contentMarkdown,
                    image: data.imageBase64,
                    name : data.name,
                })
                resolve({
                    errCode:0,
                    message:'OK! Create new Specialty'
                })     
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async(resolve, reject) =>{
        try {
            let data = await db.Specialty.findAll();
            if(data && data.length > 0) {
                data.map(item =>{
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode:0,
                message:'OK!',
                data
            })     
        } catch (e) {
            reject(e)
        }
    })
}
let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!inputId || !location) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameters!'
                })
            }
            else{
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes:['descriptionHTML','descriptionMarkdown']
                })
                if(data){
                    let doctorSpecialty = [];
                    if(location === 'ALL'){
                        doctorSpecialty = await db.DoctorInfo.findAll({
                            where: {specialtyId: inputId},
                            attributes:['doctorId','provinceId']
                        })
                    }
                    else{
                        doctorSpecialty = await db.DoctorInfo.findAll({
                            where: {specialtyId: inputId,
                                    provinceId: location
                            },
                            attributes:['doctorId','provinceId']
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty;
                }
                else data = {}

                resolve({
                    errCode:0,
                    message:'OK!',
                    data
                })     
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteSpecialtyById = (specialtyId)=>{
    return new Promise(async (resolve, reject) =>{
         try {
            let specialty = await db.Specialty.findOne({
                where: {id: specialtyId}
            });
            if(!specialty){ 
                resolve({
                    errCode: 2,
                    message: 'Specialty khong ton tai'
                });               
            }
            await db.Specialty.destroy({
                where: {id: specialtyId}
            });
            resolve({
                errCode: 0,
                message: 'OK Delete specialtyId'
            });
        } catch (e) {
            reject(e);
        }
     })
}
let editSpecialty=(data)=> {
    return new Promise(async (resolve, reject) =>{
         try {
             if(!data.id || !data.name || !data.contentMarkdown || !data.previewImgURL){
                 resolve({
                     errCode:2,
                     message: "Khong tim thay user"
                 });
             }
            let specialty = await db.Specialty.findOne({
                where: {id: data.id},
                raw:false
            });
            if(specialty){
                specialty.name = data.name,
                specialty.descriptionMarkdown = data.contentMarkdown,
                specialty.descriptionHTML = data.contentHTML
                specialty.image = data.previewImgURL
                
                await specialty.save();
                // let allUsers = await db.User.findAll();
                resolve({
                    errCode:0,
                    message: "Update specialty pass"
                });
            }
        } catch (e) {
            reject(e);
        }
     })

}
export {
    createNewSpecialty as createNewSpecialty,
    getAllSpecialty as getAllSpecialty,
    getDetailSpecialtyById as getDetailSpecialtyById,
    deleteSpecialtyById as deleteSpecialtyById,
    editSpecialty as editSpecialty,
}
