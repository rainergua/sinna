const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = '';

    if (req.body.folder) {
      folder = req.body.folder;

    } else {
      folder = 'uploads';
    }

    if(file.fieldname==='url_ci_padre'){
      folder='mid_aut_viajes';
    }


    const destFolder = path.join(__dirname, '..', 'public', folder);
    //const destFolder = path.join('D:\\archivos', folder);
    //console.log(destFolder)
    fs.ensureDirSync(destFolder);

    // Set the destination folder for the uploaded file
    cb(null, destFolder);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB
  },
  fileFilter: (req, file, cb) => {
    //console.log(req.body)
    //console.log(file)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'), false);
    }
  }
});

module.exports = upload;
