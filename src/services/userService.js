import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import emailService from './emailService'
import { v4 as uuidv4 } from 'uuid'

let buildUrlEmail = (doctorId, token)=>{
    let res = `${process.env.URL_REACT}/updatePassword?token=${token}&id=${doctorId}`
    return res
}

let handleUserLogin= (email, password) => {
    return new Promise(async (resolve, reject) =>{
         try {
            let userData ={};

            let isExist = await checkEmail(email);
            if(isExist){        
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes: ['id', 'email', 'password', 'roleId','firstName','lastName'],
                    raw: true,
                })        
                if(user){
                    let checkPassword = await bcrypt.compareSync(password, user.password)

                    if(checkPassword){
                        userData.errCode = 0;
                        userData.errMessage ="OK";
                        delete user.password;
                        userData.user=user;
                    }
                    else{
                        userData.errCode = 3;
                        userData.errMessage ="Password khong dung";
                    }
                }
                else{
                    userData.errCode = 2;
                    userData.errMessage ="User khong ton tai"
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage ="Email khong ton tai"
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
     })
}
let handleUpdatePassword=(data)=> {
    return new Promise(async (resolve, reject) =>{
         try {
             if(!data.id || !data.token || !data.password) {
                resolve({
                     errCode:2,
                     message: "Khong tim thay user"
                 });
             }
            else{
                let user = await db.User.findOne({
                    where: {
                        id: data.id,
                        token: data.token
                    },
                    raw:false
                });
                if(user){
                    let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                    user.token = '',
                    user.password = hashPasswordFromBcrypt,
                    
                    await user.save();
                    resolve({
                        errCode:0,
                        message: "Update password successfully"
                    });
                }
                else{
                    resolve({
                        errCode:1,
                        message: "Error"
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
     })

}
let handleCheckEmail = (userEmail) => {
    return new Promise(async (resolve, reject) =>{
         try {
            let user = await db.User.findOne({
                where: {email: userEmail},
                raw: false
            });
            if(user){
                let token = uuidv4();
                await emailService.updatePasswordEmail({
                    receiverEmail: userEmail,
                    // language: data.language,
                    redirectLink: buildUrlEmail(user.id, token)
                })
                user.token = token,           
                await user.save();              
                resolve({
                    errCode:0,
                    message: "Ok"
                });
            }
            else{
                resolve({
                    errCode:1,
                    message: "Email không tồn tại"
                });
            }
            resolve();
        } catch (e) {
            reject(e);
        }
     })
}
let checkEmail= (userEmail) => {
    return new Promise(async (resolve, reject) =>{
         try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            });
            if(user){                
                resolve(true);
            }
            else{
                resolve(false);
            }
            resolve();
        } catch (e) {
            reject(e);
        }
     })
}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) =>{
         try {
            let user = ''
            if(userId === 'ALL'){                
                user = await db.User.findAll({
                    attributes:{
                        exclude: ['password']
                    }
                });
            }
            if(userId && userId !== 'ALL'){
                user = await db.User.findOne({
                    where: {id: userId},
                    attributes:{
                        exclude: ['password']
                    }
                });
            }
            resolve(user);
        } catch (e) {
            reject(e);
        }
     })
}
let hashUserPassword = (password)=>{
    return new Promise(async (resolve, reject) =>{
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }
    })
}
let getNewUsers = (data) => {
    return new Promise(async(resolve, reject) =>{
        try {
            let check = await checkEmail(data.email)
            if(check){
                resolve({
                    errCode: 1,
                    message: 'Email da ton tai !'
                })
            }

            else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionID: data.positionID,
                    image: data.image,
                    // token: ''
                })
                resolve({
                    errCode:0,
                    message:'OK! Create new user successfully'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId)=>{
    return new Promise(async (resolve, reject) =>{
         try {
            let user = await db.User.findOne({
                where: {id: userId},
                attributes:{
                    exclude: ['password']
                }
            });
            if(user){
                resolve({
                    errCode: 0,
                    message: 'Ok show user',
                    user
                }) 
            }
            else resolve({
                errCode: 2,
                message: 'Khong tim thay user',
                user
            }) 
        } catch (e) {
            reject(e)
        }
     })
}

let updateUser=(data)=> {
    return new Promise(async (resolve, reject) =>{
         try {
             if(!data.id || !data.roleId || !data.gender || !data.positionID){
                 resolve({
                     errCode:2,
                     message: "Khong tim thay user"
                 });
             }
            let user = await db.User.findOne({
                where: {id: data.id},
                raw:false
            });
            if(user){
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address,
                user.phoneNumber = data.phoneNumber,
                user.gender = data.gender,
                user.roleId = data.roleId,
                user.positionID = data.positionID;
                if(data.image){
                    user.image = data.image
                }
                
                await user.save();
                // let allUsers = await db.User.findAll();
                resolve({
                    errCode:0,
                    message: "Update user pass"
                });
            }
        } catch (e) {
            reject(e);
        }
     })

}

let deleteUsers = (userId)=>{
    return new Promise(async (resolve, reject) =>{
         try {
            let user = await db.User.findOne({
                where: {id: userId}
            });
            if(!user){ 
                resolve({
                    errCode: 2,
                    message: 'User khong ton tai'
                });               
            }
            await db.User.destroy({
                where: {id: userId}
            });
            resolve({
                errCode: 0,
                message: 'OK Delete user'
            });
        } catch (e) {
            reject(e);
        }
     })
}
let getAllCodeService = (dataType)=>{
    return new Promise(async (resolve, reject) =>{
         try {
            if(!dataType){
                resolve({
                    errCode: 1,
                    message: 'Chua nhap du lieu!'
                }); 
            }
            else{
                let res={};
                let allCode = await db.Allcode.findAll({
                    where: {type: dataType}
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
     })
}
let resetTokenPassword =  (userEmail)=>{
    return new Promise(async (resolve, reject) =>{
        try {
           let user = await db.User.findOne({
               where: {email: userEmail},
               raw: false
           });
           if(user){
               
               user.token = '',           
               await user.save();              
               resolve({
                   errCode:0,
                   message: "Ok"
               });
           }
           else{
               resolve({
                   errCode:1,
                   message: "Email không tồn tại"
               });
           }
           resolve();
       } catch (e) {
           reject(e);
       }
    })
    
}
module.exports = {
    handleUserLogin: handleUserLogin,
    handleUpdatePassword:handleUpdatePassword,
    getAllUsers:getAllUsers,
    getNewUsers:getNewUsers,
    getUserInfoById:getUserInfoById,
    updateUser:updateUser,
    deleteUsers:deleteUsers,
    getAllCodeService:getAllCodeService,
    handleCheckEmail:handleCheckEmail,
    resetTokenPassword:resetTokenPassword,
}
