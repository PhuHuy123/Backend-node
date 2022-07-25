import db from '../models/index'
import CRUDService from '../services/CRUDService'

let getHomePage= async(req, res)=> {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs',{
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}

let getCRUD=(req, res)=> {
    return res.render('crud.ejs');
}
let postCRUD= async(req, res)=> {
    let message = await CRUDService.createNewUser(req.body);
    return res.send(message);
}
let displayGetCRUD = async(req, res)=> {
    let data = await CRUDService.getAllUsers({
        raw: true,
    });
    return res.render('displayCRUD.ejs',{
         dataTable: data
    });
}

let getEditCRUD = async(req,res)=>{
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('editCRUD.ejs',{
            user:userData,
        });
    }
    else{
        return res.send("User not found")
    }
}
let putCRUD = async(req, res)=> {
    let allUsers = await CRUDService.updateUserData(req.body);
    return res.render('displayCRUD.ejs',{
         dataTable: allUsers
    });
}
module.exports ={
    getHomePage:getHomePage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
}
// req.body "du lieu trong trang truyen ve khi click submit"
