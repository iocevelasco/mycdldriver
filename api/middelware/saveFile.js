const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, '.' + config.publicRoute + config.filesRoute),
    filename: (req, file, callback) => {
        const id = nanoid.nanoid(64);
        const extension = path.extname(file.originalname);
        const fileName = id + extension;
        callback(null, fileName);
  	}
});
const upload = multer({ storage });
module.exports = upload;