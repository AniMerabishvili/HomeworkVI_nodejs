const express = require('express');
const router = express.Router();

const productService = require('../services/productService');

router.get('/all', productService.getAll);
router.get('/:id', productService.getOne);
router.post('/add', productService.add);
router.update('/:id', productService.update);
router.search('/:id', productService.search);

module.exports = router;