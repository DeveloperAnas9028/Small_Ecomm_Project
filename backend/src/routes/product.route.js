import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
    listAllProductsController,
    listSingleProductController,
    productCreateController,
    updateProductController,
    deleteProductController
} from "../controllers/product.controller.js";
import {
    createProductValidator,
    updateProductValidator,
    validateProductId
} from "../validators/product.validator.js";


const productRouter = Router();


//Create API
productRouter.post("/", authenticate, createProductValidator, productCreateController);

// Read/Get All Products APi
productRouter.get("/", listAllProductsController);

//Get single products API
productRouter.get("/:id", validateProductId, listSingleProductController);

//Update Product API
productRouter.put("/:id", authenticate, validateProductId, updateProductValidator, updateProductController);

//Delete Product API
productRouter.delete("/:id", authenticate, validateProductId, deleteProductController);


export default productRouter;