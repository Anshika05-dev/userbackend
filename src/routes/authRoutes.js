const express =require("express");
const authcontroller =require('../controllers/authControllers')
const authmiddleware =require('../middleware/authMiddleware')
const router=express.Router();
const multer =require('multer')


const upload = multer({ dest: '.../uploads' });


router.post('/signup',authmiddleware.signup,authcontroller.signup)
router.post('/login',authmiddleware.login,authcontroller.login)
// router.post('/uploadimage',upload.single(req.body),authcontroller.upload)
module.exports=router;