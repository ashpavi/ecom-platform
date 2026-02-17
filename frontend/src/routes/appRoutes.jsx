import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/publicLayout";


import HomePage from "../pages/public/homepage";
import CartPage from "../pages/public/cartPage";
import CheckoutPage from "../pages/public/checkout";


export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
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
