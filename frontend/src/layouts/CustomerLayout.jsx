import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineChevronLeft,
  HiOutlineShoppingCart,
  HiOutlineSquares2X2,
  HiOutlineClipboardDocumentList,
  HiOutlineUser,
} from "react-icons/hi2";
import { toggleSidebar } from "../store/uiSlice.js";
import { api, setAccessToken } from "../lib/api.js";
import { clearUser } from "../store/authSlice.js";
import { useToast } from "../context/ToastContext.jsx";

export default function CustomerLayout() {
  const collapsed = useSelector((s) => s.ui.sidebarCollapsed);
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const collapsedRef = useRef(collapsed);

  useEffect(() => {
    collapsedRef.current = collapsed;
  }, [collapsed]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    setIsMobile(media.matches);
    
    // Auto-collapse on initial mobile viewport load
    if (media.matches && !collapsedRef.current) {
      dispatch(toggleSidebar());
    }

    const listener = (e) => {
      setIsMobile(e.matches);
      if (e.matches && !collapsedRef.current) {
        dispatch(toggleSidebar());
      }
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [dispatch]);

  const NAV = [
    { to: "/dashboard", icon: HiOutlineHome, label: "Overview", end: true },
    { to: "/dashboard/shop", icon: HiOutlineShoppingBag, label: "Shop Products" },
    { to: "/dashboard/cart", icon: HiOutlineShoppingCart, label: "My Cart" },
    { to: "/dashboard/orders", icon: HiOutlineClipboardDocumentList, label: "My Orders" },
  ];

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
    } catch (err) {}
    setAccessToken(null);
    dispatch(clearUser());
    showToast("Successfully logged out.", "info");
    navigate("/login");
  }

  // Prepend api host for avatar path if relative
  const avatarPath = user?.avatarUrl ? `http://localhost:5000${user.avatarUrl}` : null;

  return (
    <div className="flex min-h-screen bg-void bg-mesh">
      {/* Mobile Backdrop Overlay */}
      {isMobile && !collapsed && (
        <div
          onClick={() => dispatch(toggleSidebar())}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        animate={
          isMobile
            ? { x: collapsed ? "-100%" : 0, width: 240 }
            : { x: 0, width: collapsed ? 76 : 240 }
        }
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`h-screen top-0 glass border-r border-white/[0.06] flex flex-col shrink-0 z-50 ${
          isMobile ? "fixed left-0 bottom-0 shadow-2xl" : "sticky"
        }`}
      >
        <div className="flex items-center gap-2 px-5 py-6 font-display font-semibold overflow-hidden whitespace-nowrap">
          <HiOutlineSquares2X2 className="text-indigo shrink-0" size={22} />
          {!collapsed && <span className="text-white font-bold tracking-wider">SALESHUB</span>}
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => {
                if (isMobile && !collapsed) {
                  dispatch(toggleSidebar());
                }
              }}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors relative ${
                  isActive ? "text-white bg-indigo/15 border border-indigo/20" : "text-muted hover:text-white hover:bg-white/[0.04]"
                }`
              }
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User profile & Logout */}
        <div className="p-3 border-t border-white/[0.06] space-y-1">
          {/* Clickable Profile Navigation */}
          <NavLink
            to="/dashboard/profile"
            onClick={() => {
              if (isMobile && !collapsed) {
                dispatch(toggleSidebar());
              }
            }}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors border ${
                isActive
                  ? "text-white bg-indigo/15 border-indigo/20"
                  : "text-muted hover:text-white hover:bg-white/[0.04] border-transparent"
              }`
            }
          >
            {avatarPath ? (
              <img
                src={avatarPath}
                alt=""
                className="w-5 h-5 rounded-full object-cover shrink-0 border border-white/10"
              />
            ) : (
              <HiOutlineUser size={20} className="shrink-0 text-muted" />
            )}
            {!collapsed && (
              <div className="min-w-0 flex-1 text-left">
                <p className="text-xs font-semibold text-white truncate leading-tight">{user?.name}</p>
                <p className="text-[10px] text-muted truncate mt-0.5 leading-none">{user?.email}</p>
              </div>
            )}
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <HiOutlineArrowLeftOnRectangle size={20} className="shrink-0" />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Simple Top Bar */}
        <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-4 md:px-6 bg-panel/30 backdrop-blur-sm">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-1.5 border border-white/10 rounded-lg bg-panel/50 hover:bg-panel text-muted hover:text-white transition-colors"
          >
            <HiOutlineChevronLeft
              size={18}
              className={`transform transition-transform ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted font-medium bg-indigo/10 text-indigo-soft px-3 py-1 rounded-full border border-indigo/20">
              Customer Portal
            </span>
          </div>
        </header>

        {/* Content body */}
        <main className="p-4 md:p-6 max-w-[1600px] mx-auto w-full flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
