// user -> local server (file system, by multer) -> cloudinary server -> 2 steps

import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if(!localFilePath) return null;
    // upload
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })
    console.log("Upload is successful on cloudinary", response.url)
    return response;
  } catch (error) {
    fs.unlinckSync(localFilePath) // removes locally saved temporary file as the upload  operation is failed
    console.log("Upload is failed, error: " + error.message)
    return null;
  }
}

export {uploadOnCloudinary}