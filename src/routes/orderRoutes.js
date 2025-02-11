const express =require("express");
const ordercontroller =require('../controllers/orderControllers')
const ordermiddleware =require('../middleware/orderMiddleware')
const router=express.Router();
router.post('/order',ordermiddleware.createo,ordercontroller.createorder)
router.post('/product',ordermiddleware.createp,ordercontroller.createproduct)
// router.get('/detail',ordercontroller.getorder)
module.exports=router;