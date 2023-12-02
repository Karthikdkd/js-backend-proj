// multer -> used to save the file in disk before uploading into cloudinary

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage 
})
