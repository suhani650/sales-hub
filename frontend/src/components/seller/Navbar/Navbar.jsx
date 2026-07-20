import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBars,
  FaBell,
  FaEnvelope,
  FaSearch,
  FaChevronDown,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaBuilding,
} from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const [profileOpen, setProfileOpen] = useState(false);

  const [notificationCount] = useState(5);

  const [messageCount] = useState(2);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 h-20 px-8 flex items-center justify-between border-b border-white/10 bg-[#081127] backdrop-blur-xl">
      {/* LEFT */}
      <div className="flex items-center gap-5">
        <button className="lg:hidden text-white text-xl">
          <FaBars />
        </button>

        <div>
          <h2 className="text-3xl font-bold text-white">
            Vendor Command Center
          </h2>

          <p className="text-slate-400 text-sm">Multi Vendor Sales Platform</p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="hidden lg:flex items-center w-[500px] bg-[#0f1b3d] border border-cyan-500/20 rounded-2xl px-5 py-3">
        <FaSearch className="text-slate-400" />

        <input
          type="text"
          placeholder="Search products, orders, customers..."
          className="bg-transparent outline-none ml-3 text-white w-full placeholder:text-slate-500"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* MESSAGE */}
        <button
          onClick={() => navigate("/seller/chat")}
          className="
            relative
            w-12 h-12
            rounded-xl
            border border-white/10
            bg-white/5
            hover:bg-blue-500/20
            hover:border-blue-500/40
            transition-all duration-300
            flex items-center justify-center
            text-white
          "
        >
          <FaEnvelope size={18} />
        </button>

        {/* NOTIFICATION */}
        <button
          onClick={() => navigate("/seller/notifications")}
          className="
            relative
            w-12 h-12
            rounded-xl
            border border-white/10
            bg-white/5
            hover:bg-purple-500/20
            hover:border-purple-500/40
            transition-all duration-300
            flex items-center justify-center
            text-white
          "
        >
          <FaBell size={18} />
        </button>

        {/* PROFILE */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="
              flex items-center gap-3
              px-4 py-2
              rounded-2xl
              border border-white/10
              bg-white/5
              hover:bg-white/10
              hover:border-cyan-500/30
              transition-all duration-300
            "
          >
            <FaUserCircle size={42} className="text-cyan-400" />

            <div className="hidden md:block text-left">
              <h4 className="font-semibold text-white">ABC Electronics</h4>

              <p className="text-xs text-slate-400">Premium Seller</p>
            </div>

            <FaChevronDown className="text-slate-400" />
          </button>

          {/* DROPDOWN */}
          {profileOpen && (
            <div
              className="
                absolute right-0 mt-4
                w-72
                bg-[#081127]
                border border-white/10
                rounded-3xl
                overflow-hidden
                shadow-2xl
                backdrop-blur-xl
              "
            >
              {/* HEADER */}
              <div className="p-5 border-b border-white/10">
                <h3 className="text-white font-bold text-2xl">
                  ABC Electronics
                </h3>

                <p className="text-slate-400 text-sm">Premium Vendor Account</p>
              </div>

              {/* PROFILE */}
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/seller/profile");
                }}
                className="
                  w-full text-left
                  px-5 py-4
                  text-slate-300
                  hover:bg-blue-500/20
                  hover:text-white
                  transition-all
                  flex items-center gap-3
                "
              >
                <FaUserCircle />
                My Profile
              </button>

              {/* COMPANY */}
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/seller/company");
                }}
                className="
                  w-full text-left
                  px-5 py-4
                  text-slate-300
                  hover:bg-blue-500/20
                  hover:text-white
                  transition-all
                  flex items-center gap-3
                "
              >
                <FaBuilding />
                Company Profile
              </button>

              {/* SETTINGS */}
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/seller/settings");
                }}
                className="
                  w-full text-left
                  px-5 py-4
                  text-slate-300
                  hover:bg-blue-500/20
                  hover:text-white
                  transition-all
                  flex items-center gap-3
                "
              >
                <FaCog />
                Settings
              </button>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="
                  w-full text-left
                  px-5 py-4
                  text-red-400
                  hover:bg-red-500/20
                  transition-all
                  flex items-center gap-3
                "
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
