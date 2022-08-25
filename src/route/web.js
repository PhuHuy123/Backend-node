import express  from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";


let router = express.Router();

let initWebRoutes = (app)=>{
    router.get('/',homeController.getHomePage);
    router.get('/crud',homeController.getCRUD);
    router.post('/post-crud',homeController.postCRUD);
    router.get('/get-crud',homeController.displayGetCRUD);
    router.get('/edit-crud',homeController.getEditCRUD);
    router.post('/put-crud',homeController.putCRUD);
    router.get('/delete-crud',homeController.deleteCRUD);

    router.post('/api/login',userController.handleLogin);
    router.get('/api/get-all-users',userController.handleGetAllUsers);
    router.post('/api/create-new-user',userController.handleCreateNewUser);
    router.get('/api/edit-user',userController.handleEditUser);
    router.put('/api/update-user',userController.handleUpdateUser);
    router.delete('/api/delete-user',userController.handleDeleteNewUser);
    router.get('/api/all-code',userController.getAllCode);

    router.get('/api/top-doctor-home',doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor',doctorController.getAllDoctors);
    router.post('/api/create-info-doctor',doctorController.postInfoDoctor);
    router.get('/api/get-detail-doctor-by-id',doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-Schedule-doctor-by-date',doctorController.getScheduleDoctorByDate);
    router.get('/api/get-extra-info-doctor-by-id',doctorController.getExtraInfoDoctorById);
    router.get('/api/get-profile-doctor-by-id',doctorController.getProfileDoctorById);


    return app.use("/", router);
}
module.exports = initWebRoutes;
