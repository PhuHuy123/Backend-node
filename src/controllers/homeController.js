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
module.exports ={
    getHomePage:getHomePage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
}
