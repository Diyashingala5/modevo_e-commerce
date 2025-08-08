import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import AdminDashboard from './pages/admin-dashboard';
import UserProfileOrderHistory from './pages/user-profile-order-history';
import AdminProductManagement from './pages/admin-product-management';
import AdminOrderManagement from './pages/admin-order-management';
import AdminCustomerManagement from './pages/admin-customer-management';
import HomePage from './pages/home-page';
import ProductsListPage from './pages/products-list-page';
import ProductDetailsPage from './pages/product-details-page';
import CheckoutPage from './pages/checkout-page';
import CheckoutSuccess from './pages/checkout-success';
import LoginPage from './pages/login-page';


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-profile-order-history" element={<UserProfileOrderHistory />} />
        <Route path="/admin-product-management" element={<AdminProductManagement />} />
        <Route path="/admin-order-management" element={<AdminOrderManagement />} />
        <Route path="/admin-customer-management" element={<AdminCustomerManagement />} />
        <Route path="/Admin-dashboard" element={<AdminDashboard />} />
        <Route path="/products-list-page" element={<ProductsListPage />} />
        <Route path="/product-details-page" element={<ProductDetailsPage />} />
        <Route path="/checkout-page" element={<CheckoutPage />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;