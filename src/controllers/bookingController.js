import bookingService from '../services/bookingService'

// let createNewClinic = async(req, res)=>{
//     try {
//         let info = await bookingService.createNewClinic(req.body);
//         return res.status(200).json(info)
//     } catch (e) {
//         console.log(e);
//         return res.status(200).json({
//             errCode: -1,
//             message: 'Error from server...'
//         })
//     }
// }
let getAllBooking = async(req, res)=>{
    try {
        let info = await bookingService.getAllBooking(req.query.id);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
// let getDetailClinicById = async(req, res)=>{
//     try {
//         let info = await bookingService.getDetailClinicById(req.query.id);
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
    // createNewClinic:createNewClinic,
    getAllBooking:getAllBooking,
    // getDetailClinicById:getDetailClinicById
}
