import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let handleUserLogin= (email, password) => {
    return new Promise(async (resolve, reject) =>{
         try {
            let userData ={};

            let isExist = await checkEmail(email);
            if(isExist){        
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes: ['email', 'password', 'roleId'],
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
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers:getAllUsers,
}
