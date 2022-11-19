import examinationService from '../services/examinationService'

let createExamination = async(req, res)=>{
    try {
        let info = await examinationService.createExamination(req.body);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from createExamination...'
        })
    }
}
module.exports ={
    createExamination,
}
