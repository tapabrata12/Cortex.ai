import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fireBaseId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    avatar: {
        type: String
    }
},{
    timestamps: true
});

// Now building Model from the Schema

const userModel = mongoose.model("User", userSchema);
export default userModel;