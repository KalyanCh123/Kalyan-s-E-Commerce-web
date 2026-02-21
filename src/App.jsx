import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Products from "./pages/Products";
import MainLayout from "./layouts/MainLayout";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const { user } = useAuth();
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark-mode" : ""}>
      <button
        onClick={() => setDark(!dark)}
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 9999
        }}
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/reset/:token" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
            <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
            <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
            <Route path="/payment" element={<MainLayout><Payment /></MainLayout>} />
            <Route path="/success" element={<MainLayout><Success /></MainLayout>} />
            <Route path="/orders" element={<MainLayout><Orders /></MainLayout>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
