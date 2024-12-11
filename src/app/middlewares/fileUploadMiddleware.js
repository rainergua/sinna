const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = '';

    if (req.body.folder) {
      folder = req.body.folder;
    } else {
      folder = 'documentos';
    }
    if(file.fieldname==='url_contrato_pdf'){
      folder='comun/usuarios/contratos';
    }
    if(file.fieldname==='url_foto_ci'){
      folder='comun/usuarios/ci';
    }
    if(file.fieldname==='url_foto_memo'){
      folder='comun/usuarios/memo';
    }
    if(file.fieldname==='url_foto_ddjj'){
      folder='comun/usuarios/ddjj';
    }
    if(file.fieldname==='url_foto_extravio'){
      folder='comun/mid/extraviados';
    }
    if(file.fieldname==='url_acta_subconsejo_aprobacion'){
      folder='modipi';
    }


    const destFolder = path.join(__dirname, '..', 'public', folder);
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
    // Accept any file type
    cb(null, true);
  }
});

module.exports = upload;
