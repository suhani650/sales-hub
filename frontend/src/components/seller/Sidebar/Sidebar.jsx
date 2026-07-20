import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api, setAccessToken } from "../../../lib/api.js";
import { clearUser } from "../../../store/authSlice.js";

import {
  FaTachometerAlt,
  FaBuilding,
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaStar,
  FaGift,
  FaWallet,
  FaComments,
  FaCog,
  FaChevronDown,
  FaChevronRight,
  FaSignOutAlt,
  FaMoon,
  FaBars,
  FaUserShield,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FaTachometerAlt />,
    path: "/seller",
  },

  {
    title: "Business",
    icon: <FaBuilding />,
    children: [
      {
        title: "Company Profile",
        path: "/seller/company",
      },
      {
        title: "KYC Verification",
        path: "/seller/kyc",
      },
      {
        title: "Warehouse",
        path: "/seller/warehouse",
      },
      {
        title: "Brands",
        path: "/seller/brands",
      },
    ],
  },

  {
    title: "Products",
    icon: <FaBoxOpen />,
    children: [
      {
        title: "All Products",
        path: "/seller/products",
      },
      {
        title: "Add Product",
        path: "/seller/products/add",
      },
      {
        title: "Categories",
        path: "/seller/categories",
      },
      {
        title: "Inventory",
        path: "/seller/inventory",
      },
    ],
  },

  {
    title: "Orders",
    icon: <FaClipboardList />,
    path: "/seller/orders",
  },

  {
    title: "Customers",
    icon: <FaUsers />,
    path: "/seller/customers",
  },

  {
    title: "Reviews",
    icon: <FaStar />,
    path: "/seller/reviews",
  },

  {
    title: "Offers",
    icon: <FaGift />,
    path: "/seller/offers",
  },

  {
    title: "Finance",
    icon: <FaWallet />,
    children: [
      {
        title: "Earnings",
        path: "/seller/earnings",
      },
      {
        title: "Payments",
        path: "/seller/payments",
      },
      {
        title: "Analytics",
        path: "/seller/analytics",
      },
      {
        title: "Reports",
        path: "/seller/reports",
      },
    ],
  },

  {
    title: "Support",
    icon: <FaComments />,
    children: [
      {
        title: "Chat",
        path: "/seller/chat",
      },
      {
        title: "Notifications",
        path: "/seller/notifications",
      },
    ],
  },

  {
    title: "Settings",
    icon: <FaCog />,
    path: "/seller/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const [openMenus, setOpenMenus] = useState({
    Business: true,
    Products: true,
    Finance: false,
    Support: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // Even if the server call fails, still clear local session state below.
      console.error("Logout request failed:", err);
    }
    setAccessToken(null);
    dispatch(clearUser());
    navigate("/login");
  };
  return (
    <aside
      className={`
        ${collapsed ? "w-24" : "w-72"}
        transition-all duration-300
        h-screen
        sticky top-0
        flex flex-col
        bg-[#081122]
        border-r
        border-white/10
        text-white
      `}
    >
      {/* Header */}

      <div className="h-20 border-b border-white/10 flex items-center justify-between px-6">
        {!collapsed && (
          <div>
            <h1 className="text-2xl font-bold text-white">Vendor Portal</h1>

            <p className="text-xs text-slate-400">Seller Dashboard</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            h-10
            w-10
            rounded-xl
            bg-white/5
            hover:bg-blue-600
            transition
            flex
            items-center
            justify-center
          "
        >
          <FaBars />
        </button>
      </div>

      {/* Vendor Card */}

      <button
        onClick={() => navigate("/seller/company")}
        className="
  mx-4 mt-4 p-4 w-[calc(100%-2rem)]
  rounded-2xl
  relative overflow-hidden
  bg-gradient-to-br
  from-[#111827]
  via-[#1e1b4b]
  to-[#312e81]

  border border-purple-500/30

  shadow-[0_0_25px_rgba(168,85,247,0.35)]

  hover:shadow-[0_0_40px_rgba(236,72,153,0.45)]
  hover:border-pink-500/40
  hover:-translate-y-1
  hover:scale-[1.02]

  transition-all duration-300
  cursor-pointer
  group
  "
      >
        {/* Glow Effect */}
        <div
          className="
    absolute inset-0
    bg-gradient-to-r
    from-purple-500/10
    via-pink-500/10
    to-cyan-500/10
    opacity-0
    group-hover:opacity-100
    transition-all duration-500
    "
        />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="
        w-14 h-14
        rounded-full
        bg-white/10
        backdrop-blur-xl
        border border-white/10
        flex items-center justify-center
        text-cyan-400
        text-xl
        "
            >
              <FaUserShield />
            </div>

            <div className="text-left">
              <h3 className="font-bold text-white text-base">
                ABC Electronics
              </h3>

              <p className="text-xs text-slate-400">Premium Seller</p>
            </div>
          </div>

          <FaChevronRight
            className="
      text-purple-400
      group-hover:text-pink-400
      transition-all
      "
          />
        </div>
      </button>
      {/* Menu */}

      <div className="flex-1 overflow-y-auto px-3 pb-5">
        {menuItems.map((item) => {
          if (item.children) {
            return (
              <div key={item.title} className="mb-2">
                <button
                  onClick={() => toggleMenu(item.title)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                    rounded-xl
                    hover:bg-white/5
                    transition
                  "
                >
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400">{item.icon}</span>

                    {!collapsed && <span>{item.title}</span>}
                  </div>

                  {!collapsed &&
                    (openMenus[item.title] ? (
                      <FaChevronDown />
                    ) : (
                      <FaChevronRight />
                    ))}
                </button>

                {!collapsed && openMenus[item.title] && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          `
                            block
                            px-4
                            py-2.5
                            rounded-xl
                            text-sm
                            transition-all
                            ${isActive
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                            : "hover:bg-white/5 text-slate-300"
                          }
                          `
                        }
                      >
                        {child.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                mb-2
                transition-all
                ${isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "hover:bg-white/5 text-slate-300"
                }
              `
              }
            >
              <span className="text-blue-400">{item.icon}</span>

              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* Footer */}

      <div className="border-t border-white/10 p-4">
        <button
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            hover:bg-white/5
            transition
          "
        >
          <FaMoon />

          {!collapsed && <span>Dark Mode</span>}
        </button>

        <button
          onClick={logout}
          className="
            w-full
            mt-3
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            bg-red-500
            hover:bg-red-600
            transition
          "
        >
          <FaSignOutAlt />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
