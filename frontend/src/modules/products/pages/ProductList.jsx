import React, { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Package, PlusCircle, RefreshCw, SearchX, X } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../../shared/services/axiosAPI";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get("search") || "";

    // Fetch all products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await API.get("/products");
            const data = res.data.data?.products || res.data.products || res.data.data || res.data;
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle Delete
    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await API.delete(`/products/${id}`);
            toast.success("Product deleted successfully");
            setProducts((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete product");
        }
    };

    // Search Filter Logic: Title, Category, aur Description me match karega
    const filteredProducts = useMemo(() => {
        if (!searchQuery || !searchQuery.trim()) return products;

        const query = searchQuery.toLowerCase().trim();
        return products.filter((product) => {
            const titleMatch = product.title?.toLowerCase().includes(query);
            const categoryMatch = product.category?.toLowerCase().includes(query);
            const descMatch = product.description?.toLowerCase().includes(query);
            return titleMatch || categoryMatch || descMatch;
        });
    }, [products, searchQuery]);

    const clearSearch = () => {
        searchParams.delete("search");
        setSearchParams(searchParams);
    };

    return (
        <div className="py-6 space-y-6">

            {/* Top Banner / Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                        <Package className="w-7 h-7 text-blue-600" />
                        Product Catalog
                    </h1>
                    <p className="text-sm font-medium text-slate-400 mt-1">
                        Explore and manage all listed inventory
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchProducts}
                        className="p-2.5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all shadow-sm"
                        title="Reload Products"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-600" : ""}`} />
                    </button>

                    <Link
                        to="/create-product"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/25 active:scale-[0.98] transition-all"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Add Product</span>
                    </Link>
                </div>
            </div>

            {/* Active Search Filter Badge */}
            {searchQuery && (
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50/70 border border-blue-100 rounded-2xl w-fit">
                    <span className="text-xs font-semibold text-blue-800">
                        Showing results for: <span className="font-bold">"{searchQuery}"</span>
                    </span>
                    <button
                        onClick={clearSearch}
                        className="p-1 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Clear filter"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}

            {/* Content State Handling */}
            {loading ? (
                // Skeleton Loader
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div
                            key={n}
                            className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm animate-pulse space-y-4"
                        >
                            <div className="w-full h-48 bg-slate-100 rounded-2xl"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-slate-100 rounded-md w-3/4"></div>
                                <div className="h-3 bg-slate-100 rounded-md w-full"></div>
                            </div>
                            <div className="h-8 bg-slate-100 rounded-xl mt-4"></div>
                        </div>
                    ))}
                </div>
            ) : products.length === 0 ? (
                // Empty Database State
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">No products available</h3>
                    <p className="text-sm text-slate-400 mt-1 mb-6">
                        Get started by adding your first product to the store inventory.
                    </p>
                    <Link
                        to="/create-product"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/25 transition-all"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Create First Product</span>
                    </Link>
                </div>
            ) : filteredProducts.length === 0 ? (
                // Search Query No Match State
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4">
                        <SearchX className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">No matching products</h3>
                    <p className="text-sm text-slate-400 mt-1 mb-6">
                        No items match your search for "{searchQuery}". Try searching for another keyword.
                    </p>
                    <button
                        onClick={clearSearch}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/25 transition-all"
                    >
                        Clear Search Filter
                    </button>
                </div>
            ) : (
                // Products Grid
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onDelete={handleDeleteProduct}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default ProductList;