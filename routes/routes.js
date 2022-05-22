const express = require('express');
const router = express.Router();
//middewares
const AuthMiddleware  = require('../middlewares/AuthMiddleware');
const auth = require('../middlewares/auth');

//controllers
const authController = require('../controllers/authController');
const slotController = require('../controllers/slotController');


const app = express();


router.get('/', (req, res) =>  res.json("Hello, Welcome to Padel Kwt API"));

//Authentication => login / register
router.post('/auth/register', authController.register);
router.post('/auth/login',  authController.login );
router.post("/add/kid",  AuthMiddleware, slotController.addKid);
router.post('/add/pacakage', slotController.createPacakage);
router.get('/package',  AuthMiddleware,slotController.getPacakage);
router.get('/kid/detail',AuthMiddleware, slotController.getKidsDetail);
router.put('/edit/kid', AuthMiddleware, slotController.updateKidDetails );
router.post('/create/slot',AuthMiddleware, slotController.createSlot);
router.post('/book/slot',AuthMiddleware, slotController.bookSlot);
router.post('/verify/otp', authController.otpVerify);
router.post('/forget/password', authController.forgetPassword);
router.put('/reset/password',authController.resetPassword );
router.get('/slot', slotController.getSlotDetail);
router.get('/slot/:id', AuthMiddleware, slotController.getSlotByPlanId);
router.post('/create/home', AuthMiddleware, slotController.homeTagLine);
router.get('/home', slotController.getHomeTagline);
router.get('/logout', AuthMiddleware, authController.logout);
router.put('/change/password', AuthMiddleware, authController.changePassword);
router.post('/create/location', slotController.storeLocation);
router.get('/location', slotController.getLocation);
router.get('/plan/details', AuthMiddleware, slotController.getPlanDetails);
router.get('/account/detail', AuthMiddleware,authController.accountDetails);
router.get('/coach/detail', slotController.getCoach);
router.post('/notify', AuthMiddleware, slotController.notifyUser);
router.post('/add/coach', slotController.addCoach);
router.post('/create/terms',slotController.createTerms);
router.get('/get/terms/conditions', slotController.getTermsConditions);
router.get('/get/user', slotController.getUsers);
router.get('/all/kids', slotController.getAllKids);
router.get('/all/booking',slotController.getAllBookings)
router.post('/contact/support', slotController.contactUs);
router.post('/notify/user', AuthMiddleware, slotController.notifyUser);
router.get('/get/all/notification',AuthMiddleware, slotController.getnotification);
router.delete('/delete/all/notification',AuthMiddleware, slotController.clearAllNotification);
router.delete('/delete/notificationById',AuthMiddleware, slotController.clearByNotificationId);


module.exports = router;