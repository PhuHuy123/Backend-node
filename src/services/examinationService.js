import db from "../models/index";
import bcrypt from "bcryptjs";
require("dotenv").config();
import _ from "lodash";

let createExamination = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
        console.log(data)
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

module.exports = {
  createExamination,
};
