const router = require('express').Router()
const libraryController = require('../controllers/libraryController.js');

router.post('/',libraryController.addLibrary);

router.get('/getAll',libraryController.getAll);
router.get('/:id',libraryController.getOne);
router.post('/getRooms/:id',libraryController.getOne);
module.exports=router;