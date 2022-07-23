import express  from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app)=>{
    router.get('/',homeController.getHomePage);
    router.get('/it',(req, res)=>{
        return res.send('Hello World with IT')
    });
    return app.use("/", router);
}
module.exports = initWebRoutes;
