import bookingService from '../services/bookingService'

let getCancelBook = async(req, res)=>{
    try {
        let info = await bookingService.getCancelBook(req.query.id);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
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
let getBookingSingleId = async(req, res)=>{
    try {
        let info = await bookingService.getBookingSingleId(req.query.id);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from getDetailSpecialtyById...'
        })
    }
} 
module.exports ={
    getCancelBook:getCancelBook,
    getAllBooking:getAllBooking,
    getBookingSingleId:getBookingSingleId
}
