import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));

app.get("/",(req,res)=>{
    res.json({"message": "Gateway service is running"});
});

app.listen(port, ()=> console.log(`gateway started on port ${port}`));