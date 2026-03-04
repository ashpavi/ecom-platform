import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AccountLayout from "../pages/public/account/AccountLayout";
import AdminLayout from "../layouts/AdminLayout";



import ProtectedRoute from "./ProtectedRoutes";
import AdminRoute from "./AdminRoutes";
import SuperAdminRoute from "./SuperAdminRoutes";

/* PUBLIC PAGES */
import HomePage from "../pages/public/Homepage";
import ProductList from "../pages/public/ProductList";
import NoResults from "../pages/public/Noresults";
import CartPage from "../pages/public/CartPage";
import CheckoutPage from "../pages/public/Checkout";
import OrderSuccessPage from "../pages/public/OrderSuccess";
import LoginPage from "../pages/public/Login";
import RegisterPage from "../pages/public/Register";
import AboutUs from "../pages/public/AboutUs";
import ContactUs from "../pages/public/ContactUs";

/* ACCOUNT PAGES */
import DashboardPage from "../pages/public/account/Dashboard";
import MyOrdersPage from "../pages/public/account/MyOrdersPage";
import ProfileSettingsPage from "../pages/public/account/ProfileSettings";
import OrderDetailsModal from "../components/store/account/OrderDetailModal";

/* ADMIN PAGES */
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProductsPage from "../pages/admin/AdminProducts";
import AddProductPage from "../pages/admin/AddProducts";
import AdminCategoriesPage from "../pages/admin/AdminCategory";
import AdminOrdersPage from "../pages/admin/AdminOrder";
import AdminUsersPage from "../pages/admin/AdminUser";

/* SUPER ADMIN */
import SuperAdminDashboard from "../pages/superAdmin/SuperAdminDashboard";
import ProductDetailPage from "../pages/public/ProductDetails";



export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/no-results" element={<NoResults />} />
        <Route path="/cart" element={<CartPage />} />

        {/* 🔐 Protected Checkout */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orderSuccess"
          element={
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          }
        />

        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      {/* ================= ACCOUNT ROUTES ================= */}
      <Route
        element={
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/account" element={<DashboardPage />} />
        <Route path="/account/orders" element={<MyOrdersPage />} />
        <Route path="/account/profile" element={<ProfileSettingsPage />} />
        <Route path="/account/order/:orderId" element={<OrderDetailsModal />} />
      </Route>

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/products/add" element={<AddProductPage />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
      </Route>

      {/* ================= SUPER ADMIN ROUTE ================= */}
      <Route
        path="/superAdmin/superAdminDashboard"
        element={
          <SuperAdminRoute>
            <SuperAdminDashboard />
          </SuperAdminRoute>
        }
      />

    </Routes>
  );
}