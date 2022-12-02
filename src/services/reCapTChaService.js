import db from "../models/index";
import bcrypt from "bcryptjs";
const axios = require('axios');
require("dotenv").config();
import _ from "lodash";

let postReCapTCha = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.token
      ) {
        resolve({
          errCode: 1,
          message: "Missing parameters token!",
        });
      } else {
        let res = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SECRET_KEY}&response=${data.token}`
            );
        resolve({
          errCode: 0,
          message: "OK! check ReCapTCha",
          data: res.data
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postReCapTCha,
};
