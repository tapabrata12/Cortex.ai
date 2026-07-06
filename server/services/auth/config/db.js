import mongoose from "mongoose";
import dns from 'node:dns';

async function connectDB() {
    try{
        dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']); // I don't know why this is needed, but it seems to fix the DNS resolution issue
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("Connected to MongoDB !");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDB;