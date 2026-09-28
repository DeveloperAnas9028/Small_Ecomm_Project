import React from "react";
import { Tag, DollarSign, Type, FileText, Image as ImageIcon, Loader2 } from "lucide-react";

const ProductForm = ({
    formData,
    setFormData,
    onSubmit,
    isSubmitting,
    errors = {},
    setErrors,
    buttonText = "Save Product",
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Input type karte hi red error clean karna
        if (errors[name] && setErrors) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            {/* Title */}
            <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                    Product Title
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Type className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        name="title"
                        placeholder="e.g. Wireless Mechanical Keyboard"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner ${errors.title
                                ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                : "border-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            }`}
                    />
                </div>
                {errors.title && (
                    <p className="text-xs font-medium text-rose-500 mt-1.5 ml-1 animate-in fade-in duration-150">
                        {errors.title}
                    </p>
                )}
            </div>

            {/* Price & Category in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Price */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                        Price (₹)
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <DollarSign className="w-4 h-4" />
                        </div>
                        <input
                            type="number"
                            name="price"
                            placeholder="e.g. 2999"
                            value={formData.price}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner ${errors.price
                                    ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                    : "border-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                }`}
                        />
                    </div>
                    {errors.price && (
                        <p className="text-xs font-medium text-rose-500 mt-1.5 ml-1 animate-in fade-in duration-150">
                            {errors.price}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                        Category
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Tag className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            name="category"
                            placeholder="e.g. Electronics"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner ${errors.category
                                    ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                    : "border-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                }`}
                        />
                    </div>
                    {errors.category && (
                        <p className="text-xs font-medium text-rose-500 mt-1.5 ml-1 animate-in fade-in duration-150">
                            {errors.category}
                        </p>
                    )}
                </div>
            </div>

            {/* Image URL */}
            <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                    Image URL
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <ImageIcon className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        name="images"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.images}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner ${errors.images
                                ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                : "border-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            }`}
                    />
                </div>
                {errors.images && (
                    <p className="text-xs font-medium text-rose-500 mt-1.5 ml-1 animate-in fade-in duration-150">
                        {errors.images}
                    </p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                    Description
                </label>
                <div className="relative">
                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Detailed description of features, specifications, and warranty..."
                        value={formData.description}
                        onChange={handleChange}
                        className={`w-full p-4 bg-slate-50 border rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner ${errors.description
                                ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                : "border-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            }`}
                    />
                </div>
                {errors.description && (
                    <p className="text-xs font-medium text-rose-500 mt-1.5 ml-1 animate-in fade-in duration-150">
                        {errors.description}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-semibold rounded-2xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
                {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <span>{buttonText}</span>
                )}
            </button>
        </form>
    );
};

export default ProductForm;