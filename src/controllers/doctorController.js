import db from '../models/index'
import doctorService from '../services/doctorService'

let getTopDoctorHome= async(req, res)=>{
    let limit = req.query.limit
    if(!limit) limit =10;
    try {
        // +limit: de chuyen kieu string sang number
        let doctors = await doctorService.getTopDoctorHomeService(+limit);
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
module.exports ={
    getTopDoctorHome:getTopDoctorHome,
}
// req.body "du lieu trong trang truyen ve khi click submit"
