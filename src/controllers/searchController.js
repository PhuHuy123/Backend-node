import searchService from '../services/searchService'

let getSearchApi = async(req, res)=>{
    try {
        let info = await searchService.getSearchApi(req.query.name);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from getSearchApi...'
        })
    }
}
module.exports ={
    getSearchApi:getSearchApi,
}
