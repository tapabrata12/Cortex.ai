import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cors(
    {
        origin: process.env.ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
));

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));

app.get("/",(req,res)=>{
    res.json({"message": "Gateway service is running"});
});

app.listen(port, ()=> console.log(`gateway started on port http://localhost:${port}/`));