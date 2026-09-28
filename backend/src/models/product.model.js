import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 120
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 500
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    //General E-comm categries 
    category: {
        type: String,
        required: true,
        enum: [
            "Electronics",
            "Clothing & Apparel",
            "Footwear",
            "Home & Kitchen",
            "Beauty & Personal Care",
            "Health & Wellness",
        ]
    },
    images: {
        type: [{
            type: String
        }],
        validate: {
            validator: images => images.length <= 2,
            message: "A product can have at most 2 images"
        }
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
},
    { timestamps: true }
);

const productModel = mongoose.model("products", productsSchema);

export default productModel; 