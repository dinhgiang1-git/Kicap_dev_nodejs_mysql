const express = require("express");
const router = express.Router();

const listController = require('../controllers/list.controller');

router.get('/keycaps/list-page', listController.KC_List_Page);
router.get('/keycaps/list/search', listController.searchKeycaps);
router.get('/keycaps/list/filter', listController.getFiltered);
router.get('/keycaps/list', listController.KC_List);


module.exports = router;