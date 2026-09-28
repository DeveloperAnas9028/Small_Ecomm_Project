import productModel from "../models/product.model.js";

export const productCreateController = async (req, res) => {
    try {

        //Accessing  all product properties from req.body
        const { title, description, price, category, images } = req.body;


        const sellerId = req.user.userId;

        //Creating product 
        const product = await productModel.create({
            title,
            description,
            price,
            category,
            images,
            seller: sellerId
        });

        res.status(200).json({
            message: "Product created successfully",
            data: {
                product
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export const listAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find({});

        return res.status(200).json({
            message: "All Products fetched successfully",
            data: { products }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export const listSingleProductController = async (req, res) => {

    try {
        const { id } = req.params;

        const product = await productModel.findById(id);


        if (!product) {
            return res.status(404).json({
                message: "Product not found by given id"
            })
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            data: {
                product
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const updateProductController = async (req, res) => {

    try {
        const { id } = req.params;
        const productData = req.body;

        const updatedProduct = await productModel.findByIdAndUpdate(id, productData, {
            new: true,
            runValidators: true
        });

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found to update"
            });
        }

        return res.status(200).json({
            message: "Product data updated successfully",
            data: updatedProduct
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const deleteProductController = async (req, res) => {

    try {
        const { id } = req.params;

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found to delete"
            });
        }

        return res.status(200).json({
            message: "Product data deleted successfully",
            data: deletedProduct
        });
    }

    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}