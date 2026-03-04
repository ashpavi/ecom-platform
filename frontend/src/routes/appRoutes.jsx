import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/publicLayout";
import AccountLayout from "../pages/public/account/accountLayout";
import AdminLayout from "../layouts/adminLayout";



import ProtectedRoute from "./protectedRoutes";
import AdminRoute from "./adminRoutes";
import SuperAdminRoute from "./superAdminRoutes";

/* PUBLIC PAGES */
import HomePage from "../pages/public/homepage";
import ProductList from "../pages/public/productList";
import ProductDetails from "../pages/public/productDetails";
import NoResults from "../pages/public/noresults";
import CartPage from "../pages/public/cartPage";
import CheckoutPage from "../pages/public/checkout";
import OrderSuccessPage from "../pages/public/orderSuccess";
import LoginPage from "../pages/public/login";
import RegisterPage from "../pages/public/register";
import AboutUs from "../pages/public/aboutUs";
import ContactUs from "../pages/public/contactUs";

/* ACCOUNT PAGES */
import DashboardPage from "../pages/public/account/dashboard";
import MyOrdersPage from "../pages/public/account/myOrdersPage";
import ProfileSettingsPage from "../pages/public/account/profileSettings";
import OrderDetailsModal from "../components/store/account/orderDetailModal";

/* ADMIN PAGES */
import AdminDashboard from "../pages/admin/adminDashboard";
import AdminProductsPage from "../pages/admin/adminProducts";
import AddProductPage from "../pages/admin/addProducts";
import AdminCategoriesPage from "../pages/admin/adminCategory";
import AdminOrdersPage from "../pages/admin/adminOrder";
import AdminUsersPage from "../pages/admin/adminUser";

/* SUPER ADMIN */
import SuperAdminDashboard from "../pages/superAdmin/superAdminDashboard";



export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
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