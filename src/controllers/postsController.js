import postsService from '../services/postsService'

let createNewPosts = async(req, res)=>{
    try {
        let info = await postsService.createNewPosts(req.body, req.file?.path);
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
let deletePostById= async (req, res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1, 
            message: "Chua nhan duoc ID",
            users:[]
        })
    }
    let message = await postsService.deletePostById(req.body.id)
    return res.status(200).json(message)
}
let editPost = async(req, res)=> {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1, 
            message: "Chua nhan duoc thông tin",
        })
    }
    let message = await postsService.editPost(req.body, req.file?.path);
    return res.status(200).json(message)
}
module.exports ={
    createNewPosts:createNewPosts,
    getAllPosts:getAllPosts,
    getDetailPostsById:getDetailPostsById,
    deletePostById:deletePostById,
    editPost:editPost,
}
