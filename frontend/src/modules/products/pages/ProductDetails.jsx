import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ArrowLeft,
    Tag,
    Edit3,
    Trash2,
    ShieldCheck,
    Truck,
    RotateCcw,
    Loader2
} from "lucide-react";
import toast from "react-hot-toast";
import API from "../../../shared/services/axiosAPI";
import { useAuth } from "../../auth/context/AuthContext";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const res = await API.get(`/products/${id}`);
                const data = res.data.data?.product || res.data.product || res.data.data || res.data;
                setProduct(data);
            } catch (error) {
                toast.error(error.response?.data?.message || "Product details load nahi ho payi");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (!window.confirm("Kya aap sach me is product ko delete karna chahte hain?")) return;

        setDeleting(true);
        try {
            await API.delete(`/products/${id}`);
            toast.success("Product successfully delete ho gaya");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Product delete nahi ho saka");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!product) return null;

    const isSeller = user && (user._id === product.seller || user.id === product.seller);

    const displayImage = product.images && product.images.length > 0
        ? product.images[0]
        : "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80";

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">

            {/* Navigation header */}
            <div className="flex items-center justify-between mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Catalog</span>
                </Link>

                {/* Seller Actions */}
                {isSeller && (
                    <div className="flex items-center gap-2.5">
                        <Link
                            to={`/edit-product/${product._id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm transition-all"
                        >
                            <Edit3 className="w-4 h-4 text-blue-600" />
                            <span>Edit</span>
                        </Link>

                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100 text-sm font-semibold shadow-sm transition-all disabled:opacity-50"
                        >
                            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            <span>Delete</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Main Product Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Left: Product Image */}
                <div className="space-y-4">
                    <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <img
                            src={displayImage}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80";
                            }}
                        />
                    </div>
                </div>

                {/* Right: Product Meta & Purchase Specs */}
                <div className="flex flex-col justify-between space-y-6">
                    <div className="space-y-4">

                        {/* Category Tag */}
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                            <Tag className="w-3.5 h-3.5 text-blue-600" />
                            {product.category || "General"}
                        </span>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                            {product.title}
                        </h1>

                        {/* Price Box */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 inline-block w-full">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Price</span>
                            <p className="text-3xl font-black text-slate-900 mt-1">
                                ₹{Number(product.price).toLocaleString("en-IN")}
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* SaaS Assurance Pills */}
                    <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-2">
                        <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                            <Truck className="w-5 h-5 text-blue-600 mb-1" />
                            <span className="text-[11px] font-semibold text-slate-700">Fast Shipping</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                            <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                            <span className="text-[11px] font-semibold text-slate-700">Verified Seller</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                            <RotateCcw className="w-5 h-5 text-indigo-600 mb-1" />
                            <span className="text-[11px] font-semibold text-slate-700">Easy Returns</span>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;