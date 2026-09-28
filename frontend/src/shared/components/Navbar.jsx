import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import {
    Package,
    PlusCircle,
    Search,
    Bell,
    LogOut,
    LogIn,
    UserPlus,
    Hexagon,
    ChevronDown,
    X
} from "lucide-react";
import { useAuth } from "../../modules/auth/context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const currentQuery = searchParams.get("search") || "";
    const [searchQuery, setSearchQuery] = useState(currentQuery);

    // Jab bhi URL param change ho ya clear ho, local input sync rahe
    useEffect(() => {
        setSearchQuery(searchParams.get("search") || "");
    }, [searchParams]);

    // Realtime search handler (har letter type / delete karne par instant update)
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        // Agar user kisi aur page par hai (jaise /profile ya /create-product) toh direct catalog par le jao
        if (window.location.pathname !== "/") {
            if (value.trim()) {
                navigate(`/?search=${encodeURIComponent(value.trim())}`);
            } else {
                navigate("/");
            }
            return;
        }

        // Agar already home page "/" par hai toh direct searchParams update karo without full reload
        if (value.trim()) {
            setSearchParams({ search: value });
        } else {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete("search");
            setSearchParams(newParams);
        }
    };

    const handleClear = () => {
        setSearchQuery("");
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("search");
        setSearchParams(newParams);
    };

    const handleLogout = async () => {
        await logout();
        setDropdownOpen(false);
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4">

                    {/* 1. Left: Brand Logo & Navigation */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 transition-transform group-hover:scale-105">
                                <Hexagon className="w-6 h-6 fill-white stroke-blue-600 stroke-[1.5]" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                                Store<span className="text-blue-600">.</span>
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-2">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${isActive
                                        ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                    }`
                                }
                            >
                                <Package className="w-4 h-4" />
                                <span>Products</span>
                            </NavLink>

                            {user && (
                                <NavLink
                                    to="/create-product"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${isActive
                                            ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                        }`
                                    }
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    <span>Create Product</span>
                                </NavLink>
                            )}
                        </nav>
                    </div>

                    {/* 2. Middle: Real-time Live Search Input */}
                    <div className="hidden lg:flex flex-1 max-w-md mx-6">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Search className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search products by name, category..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 3. Right: User Profile / Auth State */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <button
                                    type="button"
                                    className="relative p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                                    aria-label="Notifications"
                                >
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-sm"
                                    >
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-semibold text-sm flex items-center justify-center shadow-inner">
                                            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                                        </div>
                                        <div className="text-left hidden sm:block">
                                            <p className="text-sm font-semibold text-slate-800 leading-tight">
                                                {user?.name || "Seller"}
                                            </p>
                                            <p className="text-[11px] font-medium text-slate-400">
                                                {user?.email || "Seller Account"}
                                            </p>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
                                    </button>

                                    {dropdownOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                                            onMouseLeave={() => setDropdownOpen(false)}
                                        >
                                            <div className="px-4 py-2 border-b border-slate-50 sm:hidden">
                                                <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                                                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                                            </div>

                                            <Link
                                                to="/profile"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 transition-colors"
                                            >
                                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                                My Profile
                                            </Link>

                                            <Link
                                                to="/create-product"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 transition-colors md:hidden"
                                            >
                                                <PlusCircle className="w-4 h-4 text-slate-400" />
                                                Create Product
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50/60 transition-colors text-left"
                                            >
                                                <LogOut className="w-4 h-4 text-rose-500" />
                                                Log Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2.5">
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span>Log In</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    <span>Get Started</span>
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Navbar;