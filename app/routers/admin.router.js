const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller')

router.get('/admin', adminController.show);
router.get('/admin/get-all', adminController.getAll);
router.post('/admin/add-keycap', adminController.add_Keycap);
router.delete('/admin/delete-keycap/:id', adminController.delete_keycap);
router.put('/admin/update-keycap', adminController.update_keycap);

module.exports = router;