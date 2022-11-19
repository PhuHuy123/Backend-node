import db from "../models/index";
import bcrypt from "bcryptjs";
require("dotenv").config();
import _ from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (bookingId, doctorId, timeType, date, reason, token) => {
  let res = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}&bookingId=${bookingId}&timeType=${timeType}&date=${date}&reason=${reason}`;
  return res;
};

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.doctorId ||
        !data.email ||
        !data.phoneNumber ||
        !data.timeType ||
        !data.date ||
        !data.firstName ||
        !data.lastName ||
        !data.selectedGender ||
        !data.address ||
        !data.timeType ||
        !data.selectedGender
      ) {
        resolve({
          errCode: 1,
          message: "Missing parameters !",
        });
      } else {
        
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstName: data.firstName,
            phoneNumber: data.phoneNumber,
          },
        });
        if (user && user[0]) {
          let token = uuidv4();
          let book = await db.Booking.findOrCreate({
            where: {
              patientId: user[0].id,
              statusId: "S1",
            },
            defaults: {
              statusId: "S1",
              patientId: user[0].id,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.	address,
              phoneNumber: data.phoneNumber,
              gender: data.selectedGender,
              birthday: data.birthday,
              token: token,
            },
          });
          if(book){
            await emailService.sendSimpleEmail({
              receiverEmail: data.email,
              patientName: data.firstName,
              time: data.timeString,
              doctorName: data.doctorName,
              language: data.language,
              phoneNumber: data.phoneNumber,
              redirectLink: buildUrlEmail(book[0].id, data.doctorId, data.timeType, data.date,data.reason, token),
            });
          }
        }
        resolve({
          errCode: 0,
          message: "OK! Save info patient successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.timeType || 
        !data.date || !data.reason || !data.token || !data.bookingId) {
          resolve({
            errCode: 1,
            message: "Missing parameters !",
          });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            id: data.bookingId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          await db.Examination.findOrCreate({
            where: {
              bookingId: data.bookingId,
              doctorId: data.doctorId,
              timeType: data.timeType,
            },
            defaults: {
              bookingId: data.bookingId,
              statusId: "S2",
              doctorId: data.doctorId,
              date: data.date,
              timeType: data.timeType,
              reason:data.reason,
            },
          });
          appointment.statusId = "S2";
          appointment.token = "";

          await appointment.save();

          resolve({
            errCode: 0,
            message: "OK! Save info patient successfully",
          });
        } else {
          resolve({
            errCode: 2,
            message: "Update the appointment succeed!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
let postVerifyPaypal = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.doctorId ||
        !data.email ||
        !data.phoneNumber ||
        !data.timeType ||
        !data.date ||
        !data.firstName ||
        !data.lastName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          message: "Missing parameters !",
        });
      } else {
        let user = await db.User.findOne({
          where: { email: data.email },
        });
        if (user) {
          await db.Booking.findOrCreate({
            where: {
              patientId: user.id,
              // timeType: data.timeType,
            },
            defaults: {
              statusId: "S2",
              doctorId: data.doctorId,
              patientId: user.id,
              date: data.date,
              // timeType: data.timeType,
            },
          });
        }
        resolve({
          errCode: 0,
          message: "OK! Save info patient successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
  postVerifyPaypal: postVerifyPaypal,
};
