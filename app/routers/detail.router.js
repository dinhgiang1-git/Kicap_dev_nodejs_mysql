const express = require('express');
const router = express.Router();

//Controller 
const keycapController = require('../controllers/keycap.controller');


router.get('/keycaps/:id', keycapController.get_Page);
router.get('/keycaps/get-by-id/:id', keycapController.getProductDetail);

module.exports = router;