import db from '../models/index'
import bcrypt from 'bcryptjs';
require('dotenv').config();
import _ from 'lodash';

let getSearchApi = (name) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if (!name) {
                resolve({
                  errCode: 1,
                  search:[]
                });
            }else{
                const sequelize = require('sequelize');
            let search
            let clinic = await db.Clinic.findAll({
                where: {name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')},
                attributes:['id','name', 'image']
            })
            if(clinic){
                clinic.map(item=>{
                    item.detail="clinic";
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            let specialty = await db.Specialty.findAll({
                where: {name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')},
                attributes:['id','name', 'image' ]
            })
            if(specialty){
                specialty.map(item=>{
                    item.detail="specialty"
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })  
            }
            let post = await db.Posts.findAll({
                where: {name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')},
                attributes:['id','name', 'image']
            })
            if(post){
                post.map(item=>{
                    item.detail="posts"
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            let doctor = await db.User.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('concat', sequelize.col('lastName'),' ', sequelize.col('firstName')), 'LIKE', '%' + name.toLowerCase() + '%'),
                    roleId: 'R2',
                },
                attributes:['id','firstName','lastName', 'image']
            })
            
            if(doctor){
                doctor.map(item=>{
                    item.detail="doctor"
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            search = [...clinic, ...specialty, ...post, ...doctor]
            resolve({
                errCode:0,
                search
            })     
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getSearchApi:getSearchApi,
}
