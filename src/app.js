import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

// use -> middleware configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"})); // extended -> nested object
app.use(express.static("public")) // staatic -> static files stored in public folder

app.use(cookieParser());    // to perform curd operations in cookies

// routes import

import userRoute from './routes/user.routes.js';

// routes delcaration
app.use("/api/v1/users", userRoute);
// http:localhost:8000/api/v1/users/register

export default app;