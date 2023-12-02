// db connection  -> always keep in try catch
// db -> always keep async await
import dotenv from "dotenv";
//require('dotenv').config({path: './env'})

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import {express} from "express";
import app from './app.js'
import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
})

connectDB() // since this is async function, its a promise
.then( // connect to express 
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server listening on ${process.env.PORT}`);
    })
)
.catch((error) => {
    console.error("Mongo DB connection error" + error)
})



/**
const app = express();
;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log(error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log("listening on port " + process.env.PORT)
        })


    } catch (error) {
        console.error(error)
        throw error
    }
} )()

 */

