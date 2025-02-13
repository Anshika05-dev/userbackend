const express =require("express");
const authcontroller =require('../controllers/authControllers')
const authmiddleware =require('../middleware/authMiddleware')
const router=express.Router();
const upload=require('../config/multer')


// const upload = multer({ dest: '.../uploads' });


router.post('/signup',authmiddleware.signup,authcontroller.signup)
router.post('/login',authmiddleware.login,authcontroller.login)
router.post('/uploadimage',upload.single('profile_image'),authcontroller.upload)
module.exports=router;