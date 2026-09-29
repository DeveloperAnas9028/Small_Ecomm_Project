import React from "react";
import { Link } from "react-router-dom";
import { Tag, ArrowUpRight, Edit3, Trash2 } from "lucide-react";
import { useAuth } from "../../auth/context/AuthContext";

const ProductCard = ({ product, onDelete }) => {
    const { user } = useAuth();

    // Sabhi logged in users ke liye actions enable
    const canManage = Boolean(user);

    const displayImage = product.images && product.images.length > 0
        ? product.images[0]
        : "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80";

    return (
        <div className="group bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-300 flex flex-col justify-between">

            <div>
                <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-slate-50 mb-4">
                    <img
                        src={displayImage}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80";
                        }}
                    />

                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-xl text-xs font-semibold text-slate-700 shadow-sm flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-blue-600" />
                        {product.category || "General"}
                    </span>

                    {canManage && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                            <Link
                                to={`/edit-product/${product._id}`}
                                className="p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-700 hover:text-blue-600 hover:bg-white shadow-sm transition-all"
                                title="Edit Product"
                            >
                                <Edit3 className="w-3.5 h-3.5" />
                            </Link>
                            {onDelete && (
                                <button
                                    onClick={() => onDelete(product._id)}
                                    className="p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-600 hover:bg-white shadow-sm transition-all"
                                    title="Delete Product"
                                    type="button"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="px-1">
                    <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between px-1">
                <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Price</span>
                    <p className="text-lg font-black text-slate-900">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>
                </div>

                <Link
                    to={`/products/${product._id}`}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white font-semibold text-xs transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white shadow-sm"
                >
                    <span>View</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
            </div>

        </div>
    );
};

export default ProductCard;