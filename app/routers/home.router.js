const express = require('express');
const router = express.Router();

//Controller
const homeController = require('../controllers/home.controller');

router.get('/', homeController.Keycap_page);
router.get('/get-new', homeController.Keycap_new);

module.exports = router;