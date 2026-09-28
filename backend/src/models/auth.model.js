import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: null
    }
},
    { timestamps: true }
);

const authModel = mongoose.model("users", authSchema);

export default authModel;