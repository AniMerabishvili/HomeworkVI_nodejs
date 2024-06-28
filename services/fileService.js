const FileModel = require('../models/file');
const mongoose = require('mongoose');
const fs = require('fs');

module.exports = {
    upload: async (req, res) => {
        try {
            const rootPath = "C:\\uploads";

            const id = new mongoose.Types.ObjectId();

            const fileNameParts = req.file.originalname.split('.');
            const extension = fileNameParts[fileNameParts.length - 1];

            const path = `${rootPath}\\${id}.${extension}`;
            fs.writeFileSync(path, fs.readFileSync(req.file.path));

            fs.unlinkSync(req.file.path);

            await new FileModel({
                _id: id,
                fileName: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype,
                path
            }).save();

            res.json({ fileId: id });

        } catch (err) {
            res.status(500).send(err);
        }
    },
    download: async (req, res) => {
        try {
            const file = await FileModel.findById(req.params.id);
            if (!file) {
                return res.status(404).json({
                    message: 'file_not_found'
                })
            }

            res.set({
                'Content-Type': file.mimetype,
                'Content-Disposition': 'attachment; filename=' + encodeURIComponent(file.fileName)
            });
            fs.createReadStream(file.path).pipe(res);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}