import asyncHandler from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.models.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler( async (req, res) => {
    // res.status(200).json({
    //     message: 'ok'
    // })
    
    // get user details from frontend
    // validation
    // check if user is already registered: check userName and email
    // check for images, avatar
    // upload them to cloudinary
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response

    const {fullName, email, userName, password} = req.body 

    console.log("fullName: " + fullName + " email: " + email + " password: " + password)

    // if(fullName === null){
    //     throw new ApiError(400, "fullName is required");
    // }

    if(
        [fullName, email, userName, password].some((field) => {
            field?.trim() === ""
        })
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{userName}, {email} ]
    })

    if(existedUser) {
        throw new ApiError(409, "User already exists")
    }

    const avatarPath = req.files?.avatar[0]?.path  // path from multer (multer automatically uploads file in local storage. code written in middleware)
//    const coverImagePath = req.files?.coverImage[0]?.path  // path from multer (multer automatically uploads file in local storage. code written in middleware)

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }


    if(!avatarPath){
        throw new ApiError(400, "Avatar is required")   
    }

    const avatar = await uploadOnCloudinary(avatarPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if(!avatar){
        throw new ApiError(400, "Avatar is required")   
    }


    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = User.findById(user._id).select(
        "-password  -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Sonething went wrong while creating user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "USer registered Successfully")
    )
});

export default registerUser