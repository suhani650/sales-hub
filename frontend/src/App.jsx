import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminVendors from "./pages/admin/AdminVendors.jsx";
import ComingSoon from "./pages/admin/ComingSoon.jsx";
import CustomerDashboard from "./pages/customer/CustomerDashboard.jsx";
import CustomerLayout from "./layouts/CustomerLayout.jsx";
import Shop from "./pages/customer/Shop.jsx";
import ProductDetail from "./pages/customer/ProductDetail.jsx";
import Cart from "./pages/customer/Cart.jsx";
import Checkout from "./pages/customer/Checkout.jsx";
import CheckoutSuccess from "./pages/customer/CheckoutSuccess.jsx";
import OrdersList from "./pages/customer/OrdersList.jsx";
import OrderDetail from "./pages/customer/OrderDetail.jsx";
import Profile from "./pages/customer/Profile.jsx";

// Seller Layout and Page Views
import SellerLayout from "./layouts/SellerLayout.jsx";
import SellerDashboard from "./pages/seller/SellerDashboard.jsx";
import CompanyProfile from "./pages/seller/Company/CompanyProfile.jsx";
import KYCVerification from "./pages/seller/Business/KYCVerification.jsx";
import WarehouseManagement from "./pages/seller/Business/WarehouseManagement.jsx";
import BrandManagement from "./pages/seller/Business/BrandManagement.jsx";
import VendorProducts from "./pages/seller/VendorProducts.jsx";
import AddProduct from "./pages/seller/ProductManagement/AddProduct.jsx";
import EditProduct from "./pages/seller/Products/EditProduct.jsx";
import ProductDetails from "./pages/seller/Products/ProductDetails.jsx";
import CategoryManagement from "./pages/seller/ProductManagement/CategoryManagement.jsx";
import InventoryManagement from "./pages/seller/ProductManagement/InventoryManagement.jsx";
import OrderManagement from "./pages/seller/OrderManagement/OrderManagement.jsx";
import OrderDetails from "./pages/seller/Orders/OrderDetails.jsx";
import CustomersDashboard from "./pages/seller/Customers/CustomersDashboard.jsx";
import ReviewsDashboard from "./pages/seller/Reviews/ReviewsDashboard.jsx";
import OffersDashboard from "./pages/seller/Offers/OffersDashboard.jsx";
import EarningsDashboard from "./pages/seller/Finance/EarningsDashboard.jsx";
import PaymentsDashboard from "./pages/seller/Finance/PaymentsDashboard.jsx";
import AnalyticsDashboard from "./pages/seller/Finance/AnalyticsDashboard.jsx";
import ReportsDashboard from "./pages/seller/Finance/ReportsDashboard.jsx";
import ChatDashboard from "./pages/seller/Support/ChatDashboard.jsx";
import NotificationsDashboard from "./pages/seller/Support/NotificationsDashboard.jsx";
import SettingsDashboard from "./pages/seller/Settings/SettingsDashboard.jsx";

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
};

function Page({ children }) {
  return <motion.div {...pageTransition}>{children}</motion.div>;
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Page>
              <Landing />
            </Page>
          }
        />
        <Route
          path="/login"
          element={
            <Page>
              <Login />
            </Page>
          }
        />
        <Route
          path="/register"
          element={
            <Page>
              <Register />
            </Page>
          }
        />

        <Route element={<ProtectedRoute allow={["CUSTOMER"]} />}>
          <Route path="/dashboard" element={<CustomerLayout />}>
            <Route
              index
              element={
                <Page>
                  <CustomerDashboard />
                </Page>
              }
            />
            <Route
              path="shop"
              element={
                <Page>
                  <Shop />
                </Page>
              }
            />
            <Route
              path="products/:slug"
              element={
                <Page>
                  <ProductDetail />
                </Page>
              }
            />
            <Route
              path="cart"
              element={
                <Page>
                  <Cart />
                </Page>
              }
            />
            <Route
              path="checkout"
              element={
                <Page>
                  <Checkout />
                </Page>
              }
            />
            <Route
              path="checkout/success"
              element={
                <Page>
                  <CheckoutSuccess />
                </Page>
              }
            />
            <Route
              path="orders"
              element={
                <Page>
                  <OrdersList />
                </Page>
              }
            />
            <Route
              path="orders/:id"
              element={
                <Page>
                  <OrderDetail />
                </Page>
              }
            />
            <Route
              path="profile"
              element={
                <Page>
                  <Profile />
                </Page>
              }
            />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allow={["VENDOR"]} />}>
          <Route path="/seller" element={<SellerLayout />}>
            <Route index element={<Page><SellerDashboard /></Page>} />
            <Route path="company" element={<Page><CompanyProfile /></Page>} />
            <Route path="kyc" element={<Page><KYCVerification /></Page>} />
            <Route path="warehouse" element={<Page><WarehouseManagement /></Page>} />
            <Route path="brands" element={<Page><BrandManagement /></Page>} />
            <Route path="products" element={<Page><VendorProducts /></Page>} />
            <Route path="products/add" element={<Page><AddProduct /></Page>} />
            <Route path="products/edit/:id" element={<Page><EditProduct /></Page>} />
            <Route path="products/:id" element={<Page><ProductDetails /></Page>} />
            <Route path="categories" element={<Page><CategoryManagement /></Page>} />
            <Route path="inventory" element={<Page><InventoryManagement /></Page>} />
            <Route path="orders" element={<Page><OrderManagement /></Page>} />
            <Route path="orders/:id" element={<Page><OrderDetails /></Page>} />
            <Route path="customers" element={<Page><CustomersDashboard /></Page>} />
            <Route path="reviews" element={<Page><ReviewsDashboard /></Page>} />
            <Route path="offers" element={<Page><OffersDashboard /></Page>} />
            <Route path="earnings" element={<Page><EarningsDashboard /></Page>} />
            <Route path="payments" element={<Page><PaymentsDashboard /></Page>} />
            <Route path="analytics" element={<Page><AnalyticsDashboard /></Page>} />
            <Route path="reports" element={<Page><ReportsDashboard /></Page>} />
            <Route path="chat" element={<Page><ChatDashboard /></Page>} />
            <Route path="notifications" element={<Page><NotificationsDashboard /></Page>} />
            <Route path="settings" element={<Page><SettingsDashboard /></Page>} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allow={["SUPER_ADMIN"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={
                <Page>
                  <AdminDashboard />
                </Page>
              }
            />
            <Route
              path="vendors"
              element={
                <Page>
                  <AdminVendors />
                </Page>
              }
            />
            <Route
              path="products"
              element={
                <Page>
                  <ComingSoon title="Products" />
                </Page>
              }
            />
            <Route
              path="orders"
              element={
                <Page>
                  <ComingSoon title="Orders" />
                </Page>
              }
            />
            <Route
              path="coupons"
              element={
                <Page>
                  <ComingSoon title="Coupons" />
                </Page>
              }
            />
            <Route
              path="reports"
              element={
                <Page>
                  <ComingSoon title="Reports" />
                </Page>
              }
            />
            <Route
              path="activity"
              element={
                <Page>
                  <ComingSoon title="Activity logs" />
                </Page>
              }
            />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <Page>
              <div className="min-h-screen flex items-center justify-center font-display text-xl">
                404 — Page not found
              </div>
            </Page>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
