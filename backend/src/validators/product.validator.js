import { body, param, validationResult } from "express-validator";


const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array().map(err => ({
                field: err.path || err.param,
                message: err.msg
            }))
        });
    }
    next();
};

//Validating Product Id 
export const validateProductId = [
    param("id")
        .exists().withMessage("Product ID is required").bail()
        .isMongoId().withMessage("Invalid MongoDB ObjectId format"),
    handleValidationErrors
];



export const createProductValidator = [
    body("title")
        .exists().withMessage("Product title is required").bail()
        .isString().withMessage("Title must be a string")
        .trim()
        .isLength({ min: 2, max: 120 }).withMessage("Title must be between 2 and 120 characters"),

    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a string")
        .trim()
        .isLength({ min: 20, max: 500 }).withMessage("Description must be between 20 and 500 characters"),

    body("price")
        .exists().withMessage("Price is required").bail()
        .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

    body("category")
        .exists().withMessage("Category is required").bail()
        .isString().withMessage("Category must be a string")
        .isIn([
            "Electronics",
            "Clothing & Apparel",
            "Footwear",
            "Home & Kitchen",
            "Beauty & Personal Care",
            "Health & Wellness"
        ]).withMessage("Invalid product category"),

    body("images")
        .optional()
        .isArray({ max: 2 }).withMessage("Images must be an array with at most 2 items"),

    body("images.*")
        .optional()
        .isString().withMessage("Each image must be a valid string URL"),

    handleValidationErrors
];


export const updateProductValidator = [
    body("title")
        .optional()
        .isString().withMessage("Title must be a string")
        .trim()
        .isLength({ min: 2, max: 120 }).withMessage("Title must be between 2 and 120 characters"),

    body("description")
        .optional()
        .isString().withMessage("Description must be a string")
        .trim()
        .isLength({ min: 20, max: 500 }).withMessage("Description must be between 20 and 500 characters"),

    body("price")
        .optional()
        .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

    body("category")
        .optional()
        .isString().withMessage("Category must be a string")
        .isIn([
            "Electronics",
            "Clothing & Apparel",
            "Footwear",
            "Home & Kitchen",
            "Beauty & Personal Care",
            "Health & Wellness"
        ]).withMessage("Invalid product category"),

    body("images")
        .optional()
        .isArray({ max: 2 }).withMessage("Images must be an array with at most 2 items"),

    body("images.*")
        .optional()
        .isString().withMessage("Each image must be a valid string URL"),

    handleValidationErrors
];