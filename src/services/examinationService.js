import db from "../models/index";
import bcrypt from "bcryptjs";
require("dotenv").config();
import _ from "lodash";

let createExamination = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.bookingId ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.reason
      ) {
        resolve({
          errCode: 1,
          message: "Missing parameters create Examination!",
        });
      } else {
        await db.Examination.create({
          bookingId: data.bookingId,
          doctorId: data.doctorId,
          timeType: data.timeType,
          date: data.date,
          reason: data.reason,
          statusId: 'S2',
        });
        resolve({
          errCode: 0,
          message: "OK! Create new Examination",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllExaminationById = (id) => {
  return new Promise(async(resolve, reject) =>{
      try {
          if(!id) {
              resolve({
                  errCode: 1,
                  message: 'Missing parameters!'
              })
          }
          else{
              let data = {};
              if(id === 'ALL'){                
                  data = await db.Examination.findAll();
              }
              else{
                  data = await db.Examination.findAll({
                      where: {statusId: 'S3'},
                      include:[
                        {
                          model: db.Booking,
                          as: "dataBooking",
                          where: {patientId: id},
                        },
                        {
                          model: db.User,
                          as: "dataDoctor",
                          attributes: ["firstName","lastName"]
                        },
                        {
                          model: db.Allcode,
                          as: "timeTypeDataExamination",
                          attributes: ["valueEn", "valueVi"],
                        }
                      ],
                      raw: false,
                  });
              }
              resolve({
                  errCode:0,
                  // message:'OK!',
                  data
              }) 
          }
      } catch (e) {
          reject(e)
      }
  })
}
let deleteExaminationById = (id)=>{
  return new Promise(async (resolve, reject) =>{
        try {
          let examination = await db.Examination.findOne({
              where: {id: id}
          });
          if(!examination){ 
              resolve({
                  errCode: 2,
                  message: 'Đơn khám khong ton tai'
              });               
          }
          await db.Examination.destroy({
              where: {id: id}
          });
          resolve({
              errCode: 0,
              message: 'OK Delete thành công'
          });
      } catch (e) {
          reject(e);
      }
    })
}
module.exports = {
  createExamination,
  getAllExaminationById,
  deleteExaminationById,
};
