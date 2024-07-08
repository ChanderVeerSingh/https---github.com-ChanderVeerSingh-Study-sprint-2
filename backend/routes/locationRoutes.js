const router = require('express').Router();
const locationController=require('../controllers/locationController.js');

router.post('/',locationController.addLocation);
router.get('/getAll',locationController.getAll);

module.exports=router;