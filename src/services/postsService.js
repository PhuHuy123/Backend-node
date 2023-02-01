import db from '../models/index'
import bcrypt from 'bcryptjs';
require('dotenv').config();
import _ from 'lodash';

let createNewPosts = (data, image) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!data.name || !data.description || !image || !data.contentMarkdown || !data.contentHTML || !data.adminId){
                resolve({
                    errCode: 1,
                    message: 'Missing parameters !'
                })
            }
            else{
                await db.Posts.create({
                    descriptionHTML: data.contentHTML,
                    descriptionMarkdown: data.contentMarkdown,
                    image: image,
                    name : data.name,
                    description: data.description,
                    adminId: data.adminId,
                })
                resolve({
                    errCode:0,
                    message:'OK! Create new Posts'
                })     
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllPosts = () => {
    return new Promise(async(resolve, reject) =>{
        try {
            let data = await db.Posts.findAll();
            // if(data && data.length > 0) {
            //     data.map(item =>{
            //         item.image = Buffer.from(item.image, 'base64').toString('binary');
            //         return item;
            //     })
            // }
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
let getDetailPostsById = (inputId) => {
    return new Promise(async(resolve, reject) =>{
        try {
            if(!inputId) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameters!'
                })
            }
            else{
                let data = await db.Posts.findOne({
                    where: {
                        id: inputId
                    },
                    // attributes:['descriptionHTML','descriptionMarkdown']
                })
                // if(data && data.image){
                //     data.image = Buffer.from(data.image, 'base64').toString('binary');
                // }
                if(!data) data ={}
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
let deletePostById = (postId)=>{
    return new Promise(async (resolve, reject) =>{
         try {
            let post = await db.Posts.findOne({
                where: {id: postId}
            });
            if(!post){ 
                resolve({
                    errCode: 2,
                    message: 'Post khong ton tai'
                });               
            }
            await db.Posts.destroy({
                where: {id: postId}
            });
            resolve({
                errCode: 0,
                message: 'OK Delete postId'
            });
        } catch (e) {
            reject(e);
        }
     })
}
let editPost=(data, image)=> {
    return new Promise(async (resolve, reject) =>{
         try {
             if(!data.id || !data.name || !data.description || !data.contentMarkdown){
                 resolve({
                     errCode:2,
                     message: "Khong tim thay post"
                 });
             }
            let post = await db.Posts.findOne({
                where: {id: data.id},
                raw:false
            });
            if(post){
                post.description = data.description,
                post.name = data.name,
                post.descriptionMarkdown = data.contentMarkdown,
                post.descriptionHTML = data.contentHTML
                if(image){
                    post.image = image
                }
                await post.save();
                // let allUsers = await db.User.findAll();
                resolve({
                    errCode:0,
                    message: "Update post pass"
                });
            }
        } catch (e) {
            reject(e);
        }
     })

}
module.exports = {
    createNewPosts:createNewPosts,
    getAllPosts:getAllPosts,
    getDetailPostsById:getDetailPostsById,
    deletePostById:deletePostById,
    editPost:editPost,
}
