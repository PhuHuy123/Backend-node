import express  from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import bookingController from "../controllers/bookingController";
import postsController from "../controllers/postsController";
import searchController from "../controllers/searchController";
import examinationController from "../controllers/examinationController";


let router = express.Router();

let initWebRoutes = (app)=>{
    // app.METHOD(PATCH, HANDLER)
    router.get('/',homeController.getHomePage);
    router.get('/crud',homeController.getCRUD);
    router.post('/post-crud',homeController.postCRUD);
    router.get('/get-crud',homeController.displayGetCRUD);
    router.get('/edit-crud',homeController.getEditCRUD);
    router.post('/put-crud',homeController.putCRUD);
    router.get('/delete-crud',homeController.deleteCRUD);

    router.post('/api/login',userController.handleLogin);
    router.post('/api/update-password',userController.handleUpdatePassword);
    router.post('/api/check-email',userController.handleCheckEmail);

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
    router.delete('/api/delete-schedule',doctorController.deleteSchedule);
    router.get('/api/get-extra-info-doctor-by-id',doctorController.getExtraInfoDoctorById);
    router.get('/api/get-profile-doctor-by-id',doctorController.getProfileDoctorById);

    router.get('/api/get-list-patient-for-doctor',doctorController.getListPatientForDoctor);
    router.post('/api/send-remedy', doctorController.sendRemedy);
    router.post('/api/cancel-appointment', doctorController.getCancelAppointment);
    router.post('/api/post-doctor-forward',doctorController.postDoctorForward);

    router.post('/api/patient-book-appointment',patientController.postBookAppointment);
    router.post('/api/verify-book-appointment',patientController.postVerifyBookAppointment);
    router.post('/api/verify-paypal',patientController.postVerifyPaypal);

    router.post('/api/create-new-specialty',specialtyController.createNewSpecialty);
    router.get('/api/get-specialty',specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id',specialtyController.getDetailSpecialtyById);

    router.post('/api/create-new-clinic',clinicController.createNewClinic);
    router.get('/api/get-clinic',clinicController.getAllClinic);
    router.get('/api/get-detail-clinic-by-id',clinicController.getDetailClinicById);

    router.get('/api/get-booking',bookingController.getAllBooking);
    
    router.post('/api/create-new-posts',postsController.createNewPosts);
    router.get('/api/get-posts',postsController.getAllPosts);
    router.get('/api/get-detail-posts-by-id',postsController.getDetailPostsById);

    router.get('/api/search',searchController.getSearchApi);

    router.post('/api/reset-token-password',userController.resetTokenPassword);

    router.post('/api/create-new-examination',examinationController.createExamination);



    return app.use("/", router);
}
module.exports = initWebRoutes;
