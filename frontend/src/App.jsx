import React from 'react'
import './App.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/appRoutes";
import { AuthProvider } from "./modules/auth/context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;