import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    User,
    Mail,
    ShieldCheck,
    Calendar,
    Package,
    PlusCircle,
    LogOut,
    CheckCircle2,
    Clock
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    // User ka initials nikalne ke liye
    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">

            {/* 1. Header Banner & Profile Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] mb-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                    {/* Avatar Pill */}
                    <div className="relative">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-3xl sm:text-4xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                            {getInitials(user?.name)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-xl border-2 border-white shadow-sm" title="Active Account">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                    {user?.name || "Member"}
                                </h1>
                                <p className="text-sm font-medium text-slate-400 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                                    <Mail className="w-3.5 h-3.5" />
                                    {user?.email || "No email available"}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-center sm:justify-end gap-3 pt-2 sm:pt-0">
                                <Link
                                    to="/create-product"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    <span>New Product</span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-rose-100 bg-rose-50/50 hover:bg-rose-50 text-rose-600 text-sm font-semibold active:scale-[0.98] transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </div>

                        {/* Quick Badges */}
                        <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100/60">
                                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                                Verified Seller
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-100">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                Active Session
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            {/* 2. Stats Overview Cards (Matching Reference Dashboard Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Listings</p>
                        <h3 className="text-xl font-bold text-slate-900 mt-0.5">Live Store</h3>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Auth Status</p>
                        <h3 className="text-xl font-bold text-slate-900 mt-0.5">JWT Verified</h3>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Member Since</p>
                        <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Recent"}
                        </h3>
                    </div>
                </div>

            </div>

            {/* 3. Account Information Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Account Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</p>
                        <p className="text-sm font-semibold text-slate-800 mt-1 flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            {user?.name || "Not provided"}
                        </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registered Email</p>
                        <p className="text-sm font-semibold text-slate-800 mt-1 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-slate-400" />
                            {user?.email || "Not provided"}
                        </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">User ID</p>
                        <p className="text-xs font-mono font-medium text-slate-600 mt-1 break-all">
                            {user?._id || user?.id || "N/A"}
                        </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Role / Scope</p>
                        <p className="text-sm font-semibold text-slate-800 mt-1">
                            Seller / Product Manager
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Profile;