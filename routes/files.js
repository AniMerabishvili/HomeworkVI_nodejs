const express = require('express');
const router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });

const fileService = require('../services/fileService');

router.post('/upload', upload.single('file'), fileService.upload);
router.get('/:id', fileService.download);

module.exports = router;