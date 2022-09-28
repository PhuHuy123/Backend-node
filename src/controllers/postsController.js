import postsService from '../services/postsService'

let createNewPosts = async(req, res)=>{
    try {
        let info = await postsService.createNewPosts(req.body);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getAllPosts = async(req, res)=>{
    try {
        let info = await postsService.getAllPosts();
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getDetailPostsById = async(req, res)=>{
    try {
        let info = await postsService.getDetailPostsById(req.query.id);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from getDetailPostsById...'
        })
    }
} 
module.exports ={
    createNewPosts:createNewPosts,
    getAllPosts:getAllPosts,
    getDetailPostsById:getDetailPostsById
}
