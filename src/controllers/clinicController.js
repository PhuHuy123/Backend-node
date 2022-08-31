import clinicService from '../services/clinicService'

let createNewClinic = async(req, res)=>{
    try {
        let info = await clinicService.createNewClinic(req.body);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
// let getAllSpecialty = async(req, res)=>{
//     try {
//         let info = await specialtyService.getAllSpecialty();
//         return res.status(200).json(info)
//     } catch (e) {
//         console.log(e);
//         return res.status(200).json({
//             errCode: -1,
//             message: 'Error from server...'
//         })
//     }
// }
// let getDetailSpecialtyById = async(req, res)=>{
//     try {
//         let info = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
//         return res.status(200).json(info)
//     } catch (e) {
//         console.log(e);
//         return res.status(200).json({
//             errCode: -1,
//             message: 'Error from getDetailSpecialtyById...'
//         })
//     }
// } 
module.exports ={
    createNewClinic:createNewClinic,
    // getAllSpecialty:getAllSpecialty,
    // getDetailSpecialtyById:getDetailSpecialtyById
}
