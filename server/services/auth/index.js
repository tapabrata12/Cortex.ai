import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(router);


app.get("/test",(req,res)=>{
    res.json({"message": "Auth service is running"});
});


app.listen(port, () => {
    connectDB();
    console.log(`Auth started on port ${port}`);
});
