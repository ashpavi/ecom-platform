import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/publicLayout";


import HomePage from "../pages/public/homepage";
import CartPage from "../pages/public/cartPage";
import CheckoutPage from "../pages/public/checkout";
import OrderSuccessPage from "../pages/public/orderSuccess";
import DashboardPage from "../pages/public/account/dashboard";
import MyOrdersPage from "../pages/public/account/myOrdersPage";
import ProfileSettingsPage from "../pages/public/account/profileSettings";
import AccountLayout from "../pages/public/account/accountLayout";
import LoginPage from "../pages/public/account/login";
import RegisterPage from "../pages/public/account/register";


export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orderSuccess" element={<OrderSuccessPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        
        <Route element={<AccountLayout />}>
        <Route path="/account" element={<DashboardPage />} />
        <Route path="/account/orders" element={<MyOrdersPage />} />
        <Route path="/account/profile" element={<ProfileSettingsPage />} />
      </Route>
      </Route>


      {/* ADMIN ROUTES */}
      {/* <Route element={<AdminLayout />}>
        <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
      </Route> */}

      {/* SUPER ADMIN ROUTES */}
      {/* <Route element={<SuperAdminLayout />}>
        <Route path="/superAdmin/superAdminDashboard" element={<SuperAdminDashboard />} />
      </Route> */}

    </Routes>
  );
}
