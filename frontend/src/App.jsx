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
