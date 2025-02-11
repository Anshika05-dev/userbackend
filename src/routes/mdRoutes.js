const express =require("express");
const mdcontollers=require('../controllers/mdControllers');
const router=express.Router();
router.get('/data',mdcontollers.show)
module.exports=router;