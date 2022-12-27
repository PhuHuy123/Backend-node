import * as bookingService from '../services/bookingService'

const getCancelBook = async(req, res)=>{
    try {
        const info = await bookingService.getCancelBook(req.query.id);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
const getAllBooking = async(req, res)=>{
    try {
        const info = await bookingService.getAllBooking(req.query.id);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
const getBookingSingleId = async(req, res)=>{
    try {
        const info = await bookingService.getBookingSingleId(req.query.id);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from getDetailSpecialtyById...'
        })
    }
} 
export {
    getCancelBook as getCancelBook,
    getAllBooking as getAllBooking,
    getBookingSingleId as getBookingSingleId
}
