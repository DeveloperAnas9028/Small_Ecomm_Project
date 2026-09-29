import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Edit, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../../shared/services/axiosAPI";
import ProductForm from "../components/ProductForm";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "Electronics",
        images: "",
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await API.get(`/products/${id}`);
                const product = res.data.data?.product || res.data.product || res.data.data || res.data;

                setFormData({
                    title: product.title || "",
                    description: product.description || "",
                    price: product.price || "",
                    category: product.category || "Electronics",
                    images: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : "",
                });
            } catch (error) {
                toast.error(error.response?.data?.message || "Product load karne me dikkat aayi");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]);

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

            await API.put(`/products/${id}`, payload);
            toast.success("Product successfully update ho gaya!");
            navigate(`/products/${id}`);
        } catch (error) {
            if (error.response?.data?.errors) {
                const validationMap = {};
                error.response.data.errors.forEach((err) => {
                    const key = err.field || err.path;
                    validationMap[key] = err.message || err.msg;
                });
                setErrors(validationMap);
            } else {
                toast.error(error.response?.data?.message || "Update fail ho gaya");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-72 items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-6 px-4">
            <Link
                to={`/products/${id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Product Details</span>
            </Link>

            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Edit className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Edit Product</h1>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Product details update karke live changes save karein
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
                    buttonText="Save & Update Product"
                />
            </div>
        </div>
    );
};

export default EditProduct;