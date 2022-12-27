import db from '../models/index'
import * as CRUDService from '../services/CRUDService'

const getHomePage= async(req, res)=> {
    try {
        const data = await db.User.findAll();
        return res.render('homePage.ejs',{
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}

const getCRUD=(req, res)=> {
    return res.render('crud.ejs');
}
const postCRUD= async(req, res)=> {
    const message = await CRUDService.createNewUser(req.body);
    return res.send(message);
}
const displayGetCRUD = async(req, res)=> {
    const data = await CRUDService.getAllUsers({
        raw: true,
    });
    return res.render('displayCRUD.ejs',{
         dataTable: data
    });
}

const getEditCRUD = async(req,res)=>{
    const userId = req.query.id;
    if(userId){
        const userData = await CRUDService.getUserInfoById(userId);
        return res.render('editCRUD.ejs',{
            user:userData,
        });
    }
    else{
        return res.send("User not found")
    }
}
const putCRUD = async(req, res)=> {
    const allUsers = await CRUDService.updateUserData(req.body);
    return res.render('displayCRUD.ejs',{
         dataTable: allUsers
    });
}
const deleteCRUD = async(req,res)=> {
    if(req.query.id){
        await CRUDService.deleteUserById(req.query.id);
        return res.send("Delete Thanh cong!")
    }
    else {
        return res.send("It's not user ID!")
    }
}
export {
    getHomePage as getHomePage,
    getCRUD as getCRUD,
    postCRUD as postCRUD,
    displayGetCRUD as displayGetCRUD,
    getEditCRUD as getEditCRUD,
    putCRUD as putCRUD,
    deleteCRUD as deleteCRUD
}
// req.body "du lieu trong trang truyen ve khi click submit"
