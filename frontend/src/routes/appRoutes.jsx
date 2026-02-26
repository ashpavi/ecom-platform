import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/publicLayout";

import HomePage from "../pages/public/homepage";
import ProductList from "../pages/public/productlist";
import ProductDetails from "../pages/public/productdetails";
import NoResults from "../pages/public/noresults";
import AboutUs from "../pages/public/aboutus";
import ContactUs from "../pages/public/contactus";
import CartPage from "../pages/public/cartPage";
import CheckoutPage from "../pages/public/checkout";
import OrderSuccessPage from "../pages/public/orderSuccess";
import DashboardPage from "../pages/public/account/dashboard";
import MyOrdersPage from "../pages/public/account/myOrdersPage";
import ProfileSettingsPage from "../pages/public/account/profileSettings";
import AccountLayout from "../pages/public/account/accountLayout";
import LoginPage from "../pages/public/account/login";
import RegisterPage from "../pages/public/account/register";
import OrderDetailsModal from "../components/store/account/orderDetailModal";
import AdminLayout from "../layouts/adminLayout";
import AdminDashboard from "../pages/admin/adminDashboard";



export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>

      {/* ABOUT US PAGE - WITHOUT NAVBAR & FOOTER */}
      <Route path="/about" element={<AboutUs />} />
      {/* CONTACT US PAGE - WITHOUT NAVBAR & FOOTER */}
      <Route path="/contact" element={<ContactUs />} />
      {/* NO RESULTS PAGE - WITHOUT FOOTER */}
      <Route path="/no-results" element={<NoResults />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orderSuccess" element={<OrderSuccessPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        
        <Route element={<AccountLayout />}>
        <Route path="/account" element={<DashboardPage />} />
        <Route path="/account/orders" element={<MyOrdersPage />} />
        <Route path="/account/profile" element={<ProfileSettingsPage />} />
        <Route path="/account/order/:orderId" element={<OrderDetailsModal/>} />
      </Route>
      </Route>


      {/* ADMIN ROUTES */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
      </Route> 

      {/* SUPER ADMIN ROUTES */}
      {/* <Route element={<SuperAdminLayout />}>
        <Route path="/superAdmin/superAdminDashboard" element={<SuperAdminDashboard />} />
      </Route> */}

    </Routes>
  );
}
