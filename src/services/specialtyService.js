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
module.exports = {
    createNewSpecialty:createNewSpecialty,
}
