import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, PackagePlus } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../../shared/services/axiosAPI";
import ProductForm from "../components/ProductForm";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Default category "Electronics" set kar di hai
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "Electronics",
        images: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                images: formData.images ? [formData.images] : [],
            };

            await API.post("/products", payload);
            toast.success("Product created successfully!");
            navigate("/");
        } catch (error) {
            if (error.response?.data?.errors) {
                const validationMap = {};
                error.response.data.errors.forEach((err) => {
                    const key = err.field || err.path;
                    validationMap[key] = err.message || err.msg;
                });
                setErrors(validationMap);
            } else {
                toast.error(error.response?.data?.message || "Failed to create product");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-6 px-4">
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Catalog</span>
            </Link>

            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <PackagePlus className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Add New Product</h1>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Fill in the details to list an item in your store
                        </p>
                    </div>
                </div>

                <ProductForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    errors={errors}
                    setErrors={setErrors}
                    buttonText="Publish Product"
                />
            </div>
        </div>
    );
};

export default CreateProduct;