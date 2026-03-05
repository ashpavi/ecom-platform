import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout.jsx";
import AccountLayout from "../pages/public/account/AccountLayout";
import AdminLayout from "../layouts/AdminLayout";



import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";

/* PUBLIC PAGES */
import HomePage from "../pages/public/Homepage";
import ProductList from "../pages/public/ProductList";
import ProductDetails from "../pages/public/ProductDetails";
import NoResults from "../pages/public/NoResults";
import CartPage from "../pages/public/CartPage";
import Checkout from "../pages/public/Checkout";
import OrderSuccess from "../pages/public/OrderSuccess";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import AboutUs from "../pages/public/AboutUs";
import ContactUs from "../pages/public/ContactUs";

/* ACCOUNT PAGES */
import Dashboard from "../pages/public/account/Dashboard";
import MyOrdersPage from "../pages/public/account/MyOrdersPage";
import ProfileSettings from "../pages/public/account/ProfileSettings";
import OrderDetailModal from "../components/store/account/OrderDetailModal";

/* ADMIN PAGES */
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AddProducts from "../pages/admin/AddProducts";
import AdminCategory from "../pages/admin/AdminCategory";
import AdminOrder from "../pages/admin/AdminOrder";
import AdminUser from "../pages/admin/AdminUser";

/* SUPER ADMIN */
import SuperAdminDashboard from "../pages/superAdmin/SuperAdminDashboard";








export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails/>} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/no-results" element={<NoResults />} />
        <Route path="/cart" element={<CartPage />} />

        {/* 🔐 Protected Checkout */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/orderSuccess"
          element={
            <ProtectedRoutes>
              <OrderSuccess />
            </ProtectedRoutes>
          }
        />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      {/* ================= ACCOUNT ROUTES ================= */}
      <Route
        element={
          <ProtectedRoutes>
            <AccountLayout />
          </ProtectedRoutes>
        }
      >
        <Route path="/account" element={<Dashboard />} />
        <Route path="/account/orders" element={<MyOrdersPage />} />
        <Route path="/account/profile" element={<ProfileSettings />} />
        <Route path="/account/order/:orderId" element={<OrderDetailModal />} />
      </Route>

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        element={
          <AdminRoutes>
            <AdminLayout />
          </AdminRoutes>
        }
      >
        <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/add" element={<AddProducts />} />
        <Route path="/admin/categories" element={<AdminCategory />} />
        <Route path="/admin/orders" element={<AdminOrder />} />
        <Route path="/admin/users" element={<AdminUser />} />
      </Route>

      {/* ================= SUPER ADMIN ROUTE ================= */}
      <Route
        path="/superAdmin/superAdminDashboard"
        element={
          <SuperAdminRoutes>
            <SuperAdminDashboard />
          </SuperAdminRoutes>
        }
      />

    </Routes>
  );
}
