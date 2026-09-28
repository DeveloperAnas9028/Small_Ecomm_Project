import { createContext, useContext, useState, useEffect } from "react";
import API from "../../../shared/services/axiosAPI";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    const [errors, setErrors] = useState({});
    const clearErrors = () => setErrors({});

    const resetRegisterForm = () => {
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
        setShowRegisterPassword(false);
        clearErrors();
    };

    const resetLoginForm = () => {
        setLoginEmail("");
        setLoginPassword("");
        setShowLoginPassword(false);
        clearErrors();
    };

    const fetchUser = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token || token === "undefined") {
            localStorage.removeItem("accessToken");
            setLoading(false);
            return;
        }

        try {
            const res = await API.get("/auth/me");
            setUser(res.data.data?.user || res.data.user);
        } catch {
            setUser(null);
            localStorage.removeItem("accessToken");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async () => {
        clearErrors();

        if (!loginEmail.trim() || !loginPassword.trim()) {
            toast.error("Please enter email and password");
            return false;
        }

        setIsSubmitting(true);
        try {
            const res = await API.post("/auth/login", {
                email: loginEmail,
                password: loginPassword,
            });

            const token = res.data.accessToken || res.data.data?.accessToken;
            const userData = res.data.data?.user || res.data.user;

            if (token) {
                localStorage.setItem("accessToken", token);
            }
            if (userData) {
                setUser(userData);
            }

            toast.success("Logged in successfully!");
            resetLoginForm();
            return true;
        } catch (error) {
            if (error.response?.data?.errors) {
                const validationMap = {};
                error.response.data.errors.forEach((err) => {
                    const key = err.field || err.path;
                    validationMap[key] = err.message || err.msg;
                });
                setErrors(validationMap);
            } else {
                const errorMsg =
                    error.response?.data?.message ||
                    "Invalid email or password.";
                toast.error(errorMsg);
            }
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const register = async () => {
        clearErrors();

        if (!registerName.trim() || !registerEmail.trim() || !registerPassword.trim()) {
            toast.error("Please fill in all fields");
            return false;
        }

        setIsSubmitting(true);
        try {
            const res = await API.post("/auth/register", {
                name: registerName,
                email: registerEmail,
                password: registerPassword,
            });

            toast.success(res.data?.message || "Account created successfully! Please login.");
            resetRegisterForm();
            return true;
        } catch (error) {
            if (error.response?.data?.errors) {
                const validationMap = {};
                error.response.data.errors.forEach((err) => {
                    const key = err.field || err.path;
                    validationMap[key] = err.message || err.msg;
                });
                setErrors(validationMap);
            } else {
                const errorMsg =
                    error.response?.data?.message ||
                    "Registration failed. Please try again.";
                toast.error(errorMsg);
            }
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const logout = async () => {
        try {
            await API.post("/auth/logout");
        } catch (err) {
            console.error(err);
        } finally {
            localStorage.removeItem("accessToken");
            setUser(null);
            clearErrors();
            toast.success("Logged out successfully");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                isSubmitting,
                fetchUser,
                login,
                register,
                logout,
                errors,
                setErrors,
                clearErrors,
                registerName,
                setRegisterName,
                registerEmail,
                setRegisterEmail,
                registerPassword,
                setRegisterPassword,
                showRegisterPassword,
                setShowRegisterPassword,
                resetRegisterForm,
                loginEmail,
                setLoginEmail,
                loginPassword,
                setLoginPassword,
                showLoginPassword,
                setShowLoginPassword,
                resetLoginForm,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);