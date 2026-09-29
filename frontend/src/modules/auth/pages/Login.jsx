import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Hexagon, Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();

    const {
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        showLoginPassword,
        setShowLoginPassword,
        login,
        isSubmitting,
        errors,
        setErrors,
    } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isSuccess = await login();
        if (isSuccess) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center py-10 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-slate-100">

                {/* Brand Icon & Heading */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-3">
                        <Hexagon className="w-7 h-7 fill-white stroke-blue-600 stroke-[1.5]" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Welcome back
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Enter your credentials to access your store account
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input
                                type="email"
                                placeholder="seller@example.com"
                                value={loginEmail}
                                onChange={(e) => {
                                    setLoginEmail(e.target.value);
                                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                                }}
                                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner ${errors.email
                                    ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                    : "border-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs font-medium text-rose-500 mt-1.5 ml-1 animate-in fade-in duration-150">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input
                                type={showLoginPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={loginPassword}
                                onChange={(e) => {
                                    setLoginPassword(e.target.value);
                                    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                                }}
                                className={`w-full pl-10 pr-11 py-2.5 bg-slate-50 border rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner ${errors.password
                                    ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                    : "border-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowLoginPassword(!showLoginPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs font-medium text-rose-500 mt-1.5 ml-1 animate-in fade-in duration-150">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-semibold rounded-2xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <span>Sign In</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
                <br />
                <h3>For Editing product use 
                    <br />email:seller@gmail.com and password:pass123#</h3>
                {/* Switch to Register */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Register here
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;