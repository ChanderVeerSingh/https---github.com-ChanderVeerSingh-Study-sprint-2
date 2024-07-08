const router = require('express').Router()
const roomController = require('../controllers/roomController.js');
const { room } = require('../models/index.js');

router.post('/',roomController.addRoom);
router.get('/getAll',roomController.getAll);
router.get('/:id',roomController.getRoom);

module.exports=router;