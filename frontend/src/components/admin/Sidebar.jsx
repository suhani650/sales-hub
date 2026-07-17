import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  HiOutlineSquares2X2,
  HiOutlineBuildingStorefront,
  HiOutlineShoppingBag,
  HiOutlineClipboardDocumentList,
  HiOutlineTicket,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineChevronLeft,
} from "react-icons/hi2";
import { toggleSidebar } from "../../store/uiSlice.js";

const NAV = [
  { to: "/admin", icon: HiOutlineSquares2X2, label: "Dashboard", end: true },
  { to: "/admin/vendors", icon: HiOutlineBuildingStorefront, label: "Vendors" },
  { to: "/admin/products", icon: HiOutlineShoppingBag, label: "Products" },
  { to: "/admin/orders", icon: HiOutlineClipboardDocumentList, label: "Orders" },
  { to: "/admin/coupons", icon: HiOutlineTicket, label: "Coupons" },
  { to: "/admin/reports", icon: HiOutlineChartBar, label: "Reports" },
  { to: "/admin/activity", icon: HiOutlineClock, label: "Activity logs" },
];

export default function Sidebar() {
  const collapsed = useSelector((s) => s.ui.sidebarCollapsed);
  const dispatch = useDispatch();

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 240 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-screen sticky top-0 glass border-r border-white/[0.06] flex flex-col shrink-0 z-40"
    >
      <div className="flex items-center gap-2 px-5 py-6 font-display font-semibold overflow-hidden whitespace-nowrap">
        <HiOutlineSquares2X2 className="text-indigo shrink-0" size={22} />
        {!collapsed && "SALESHUB"}
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors relative ${
                isActive ? "text-ink bg-indigo/15" : "text-muted hover:text-ink hover:bg-white/[0.04]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo rounded-full"
                  />
                )}
                <item.icon size={19} className="shrink-0 transition-transform group-hover:scale-110" />
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => dispatch(toggleSidebar())}
        className="m-3 p-2.5 rounded-xl hover:bg-white/[0.04] text-muted flex items-center justify-center transition-colors"
      >
        <motion.span animate={{ rotate: collapsed ? 180 : 0 }}>
          <HiOutlineChevronLeft />
        </motion.span>
      </button>
    </motion.aside>
  );
}
