const express = require('express');
const router = express.Router();

const studentService = require('../services/studentService');
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/all', ApiSecurity.requireLogin, studentService.getAll);
router.get('/:id', ApiSecurity.requireLogin, studentService.getOne);
router.post('/add', ApiSecurity.requirePermits('manage_student'), studentService.add);
router.delete('/:id', ApiSecurity.requirePermits('manage_student'), studentService.delete);
router.put('/:id', ApiSecurity.requirePermits('manage_student'), studentService.update);

module.exports = router;