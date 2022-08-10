import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let getTopDoctorHomeService = (limitInput) => {
    return new Promise(async (resolve, reject) =>{
         try {
            let user = await db.User.findAll({
                limit: limitInput,
                order: [['createdAt','DESC']],
                attributes:{
                    exclude: ['password']
                },
                where: {roleId: 'R2'},
                include: [
                    {model: db.Allcode, as: 'positionData', attributes:['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes:['valueEn', 'valueVi']}
                ],
                raw: true,
                nest: true,
            })
            resolve({
                errCode: 0,
                data: user
            });
        } catch (e) {
            reject(e);
        }
     })
}

module.exports = {
    getTopDoctorHomeService:getTopDoctorHomeService,
}
