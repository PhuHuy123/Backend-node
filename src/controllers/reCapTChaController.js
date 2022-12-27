const axios = require('axios');
require('dotenv').config();
import * as reCapTChaService from '../services/reCapTChaService';
let postReCapTCha = async(req, res)=>{
    try {
        let info = await reCapTChaService.postReCapTCha(req.body);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from postReCapTCha...'
        })
    }
}
export {
    postReCapTCha,
}
