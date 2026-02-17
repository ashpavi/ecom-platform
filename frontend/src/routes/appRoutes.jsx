import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/publicLayout";


import HomePage from "../pages/public/homepage";
import ProductList from "../pages/public/productlist";
import ProductDetails from "../pages/public/productdetails";


export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
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
