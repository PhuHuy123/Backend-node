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
                    item.image = new Buffer(item.image, 'base64').toString('binary');
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
module.exports = {
    createNewSpecialty:createNewSpecialty,
    getAllSpecialty:getAllSpecialty
}
