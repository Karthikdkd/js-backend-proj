// user -> local server (file system, by multer) -> cloudinary server -> 2 steps

import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: './.env'
})


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
    fs.unlinkSync (localFilePath)
    console.log("Upload is successful on cloudinary", response.url)
    return response;
  } catch (error) {
    console.log("Upload is failed, localFilePath: " + localFilePath)
    console.log("Upload is failed, error: " + error.toString())
    fs.unlinkSync (localFilePath) // removes locally saved temporary file as the upload  operation is failed
    return null;
  }
}

export {uploadOnCloudinary}