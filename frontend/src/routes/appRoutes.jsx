import { createBrowserRouter, Navigate } from "react-router-dom";

// Shared Components & Layout
import ProtectedRoute from "../shared/components/ProtectedRoute";
import Navbar from "../shared/components/Navbar";

// Auth Module Pages
import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";
import Profile from "../modules/auth/pages/Profile";

// Products Module Pages
import ProductList from "../modules/products/pages/ProductList";
import ProductDetails from "../modules/products/pages/ProductDetails";
import CreateProduct from "../modules/products/pages/CreateProduct";
import EditProduct from "../modules/products/pages/EditProduct";

// Root Layout Component (Navbar + Page Content)
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // --- Public Routes ---
      {
        index: true,
        element: <ProductList />, // Sabhi products ka catalog (Home page)
      },
      {
        path: "products/:id",
        element: <ProductDetails />, // Single product view page
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      // --- Protected Routes (Login Required) ---
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />, // Logged in user profile
          },
          {
            path: "create-product",
            element: <CreateProduct />, // Seller create product page
          },
          {
            path: "edit-product/:id",
            element: <EditProduct />, // Product update/edit page
          },
        ],
      },

      // --- 404 Wildcard Fallback ---
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);