const express =require("express");
const sitecontroller =require('../controllers/siteControllers')
const sitemiddleware =require('../middleware/siteMiddleware')
const router=express.Router();
router.post('/create',sitemiddleware.create,sitecontroller.create)
router.patch('/update',sitemiddleware.updatesite,sitecontroller.updatesite)
router.post('/delete',sitecontroller.delete)
router.get('/display',sitecontroller.listsites)
router.get('/viewsite/:cooperation_no',sitecontroller.viewsite)
module.exports=router;