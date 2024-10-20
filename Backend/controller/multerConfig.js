import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
  destination: './uploads/', 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Set the file name
  },
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, 
  fileFilter: (req, file, cb) => {
    
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: File type not supported');
    }
  },
}).single('file'); 

export default upload;
