import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  HiOutlineSquares2X2,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineBuildingStorefront,
  HiOutlineMapPin,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { api, setAccessToken } from "../lib/api.js";
import { setUser } from "../store/authSlice.js";

// Mirrors the three self-service roles from the SRD (2.1 / 2.2 / 2.3):
// Customer (browse & buy), Vendor/Client (launch products like Amazon/Flipkart),
// Field Sales Officer (join from anywhere & sell, like Zepto/Blinkit).
const ROLE_TABS = [
  { value: "CUSTOMER", label: "Customer" },
  { value: "VENDOR", label: "Seller / Vendor" },
  { value: "FIELD_SALES_OFFICER", label: "Field Sales Officer" },
];

export default function Register() {
  const [role, setRole] = useState("CUSTOMER");
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const password = watch("password");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function selectRole(next) {
    setRole(next);
    setServerError(null);
    reset(undefined, { keepValues: true });
  }

  async function onSubmit(values) {
    setServerError(null);
    setLoading(true);
    try {
      await api.post("/auth/register", { ...values, role });
      setRegisteredEmail(values.email);
      setShowOtp(true);
    } catch (err) {
      setServerError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    if (!otpValue || otpValue.length !== 6) {
      setServerError("Please enter a valid 6-digit OTP.");
      return;
    }
    setServerError(null);
    setLoading(true);
    try {
      const { data } = await api.post("/auth/verify-signup", {
        email: registeredEmail,
        otp: otpValue
      });
      setAccessToken(data.accessToken);
      dispatch(setUser(data.user));

      if (data.user.role === "VENDOR") {
        navigate("/", { state: { pendingApproval: true } });
      } else {
        navigate("/");
      }
    } catch (err) {
      setServerError(err.response?.data?.error || "Invalid OTP code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (showOtp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh px-4 sm:px-6 py-8 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-panel border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md"
        >
          <div className="flex items-center gap-2 font-display font-semibold text-lg mb-8">
            <HiOutlineSquares2X2 className="text-indigo" size={22} />
            SALESHUB
          </div>
          <h1 className="font-display text-2xl font-semibold mb-1">Verify your email</h1>
          <p className="text-sm text-muted mb-6">
            We sent a 6-digit OTP code to <span className="text-white font-medium">{registeredEmail}</span>.
          </p>

          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-indigo/50 transition-colors">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  className="bg-transparent w-full text-center text-lg tracking-widest font-mono focus:outline-none"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>

            {serverError && <p className="text-xs text-amber">{serverError}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center flex mt-2">
              {loading ? "Verifying OTP…" : "Verify & Complete Signup"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setShowOtp(false);
              setOtpValue("");
              setServerError(null);
            }}
            className="text-xs text-muted hover:underline mt-6 block text-center w-full bg-transparent border-0 outline-none cursor-pointer"
          >
            Go back to signup
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-4 sm:px-6 py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-md p-6 sm:p-8"
      >
        <div className="flex items-center gap-2 font-display font-semibold text-lg mb-8">
          <HiOutlineSquares2X2 className="text-indigo" size={22} />
          SALESHUB
        </div>
        <h1 className="font-display text-2xl font-semibold mb-1">Create your account</h1>
        <p className="text-sm text-muted mb-6">Join as a customer, seller, or field sales officer</p>

        <div className="mb-6 space-y-2 relative">
          <label className="text-xs font-semibold text-muted uppercase tracking-wider">Join As</label>
          
          {/* Custom Dropdown Trigger Box */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 focus:border-indigo/50 hover:border-white/20 transition-all text-left"
          >
            <span className="text-sm text-white">
              {ROLE_TABS.find((tab) => tab.value === role)?.label}
            </span>
            <HiOutlineChevronDown
              size={16}
              className={`text-muted transition-transform duration-200 shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Custom Dropdown Options Sheet */}
          <AnimatePresence>
            {isDropdownOpen && (
              <>
                {/* Overlay backdrop block */}
                <div className="fixed inset-0 z-10 bg-transparent" onClick={() => setIsDropdownOpen(false)} />
                
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-panel border border-white/10 rounded-xl overflow-hidden shadow-2xl z-20 backdrop-blur-xl p-1"
                >
                  {ROLE_TABS.map((tab) => (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => {
                        selectRole(tab.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left text-xs px-3.5 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                        role === tab.value
                          ? "bg-indigo/20 text-white font-medium border border-indigo/20"
                          : "text-muted hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <span>{tab.label}</span>
                      {role === tab.value && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo shadow-glow shrink-0" />
                      )}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-indigo/50 transition-colors">
              <HiOutlineUser className="text-muted shrink-0" />
              <input
                type="text"
                placeholder="Full name"
                className="bg-transparent w-full text-sm focus:outline-none"
                {...register("name", {
                  required: "Name is required",
                  maxLength: { value: 120, message: "Name cannot exceed 120 characters" },
                  pattern: {
                    value: /^[A-Za-z\s.'-]+$/,
                    message: "Name can only contain letters, spaces, and punctuation (.-')",
                  },
                })}
              />
            </div>
            {errors.name && <p className="text-xs text-amber mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-indigo/50 transition-colors">
              <HiOutlineEnvelope className="text-muted shrink-0" />
              <input
                type="email"
                placeholder="you@company.com"
                className="bg-transparent w-full text-sm focus:outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Enter a valid email address",
                  },
                })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s/g, "");
                }}
              />
            </div>
            {errors.email && <p className="text-xs text-amber mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-indigo/50 transition-colors">
              <HiOutlinePhone className="text-muted shrink-0" />
              <input
                type="tel"
                placeholder="Mobile number"
                className="bg-transparent w-full text-sm focus:outline-none"
                {...register("phone", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: "Enter a valid international phone format (e.g. +91XXXXXXXXXX)",
                  },
                })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/(?!^\+)[^\d]/g, "");
                }}
              />
            </div>
            {errors.phone && <p className="text-xs text-amber mt-1">{errors.phone.message}</p>}
          </div>

          <AnimatePresence mode="wait">
            {role === "VENDOR" && (
              <motion.div
                key="vendor-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div>
                  <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-indigo/50 transition-colors">
                    <HiOutlineBuildingStorefront className="text-muted shrink-0" />
                    <input
                      type="text"
                      placeholder="Store / business name"
                      className="bg-transparent w-full text-sm focus:outline-none"
                      {...register("storeName", { required: role === "VENDOR" ? "Store name is required" : false })}
                    />
                  </div>
                  {errors.storeName && <p className="text-xs text-amber mt-1">{errors.storeName.message}</p>}
                </div>
                <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-indigo/50 transition-colors">
                  <input
                    type="text"
                    placeholder="GST number (optional)"
                    className="bg-transparent w-full text-sm focus:outline-none"
                    {...register("gstNumber")}
                  />
                </div>
              </motion.div>
            )}

            {role === "FIELD_SALES_OFFICER" && (
              <motion.div
                key="fso-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-indigo/50 transition-colors">
                  <HiOutlineMapPin className="text-muted shrink-0" />
                  <input
                    type="text"
                    placeholder="City / region you'll sell in"
                    className="bg-transparent w-full text-sm focus:outline-none"
                    {...register("region")}
                  />
                </div>
                <p className="text-[11px] text-muted mt-1">
                  You can join from any location — we use this to route nearby leads to you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-indigo/50 transition-colors">
              <HiOutlineLockClosed className="text-muted shrink-0" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent w-full text-sm focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "At least 8 characters" },
                })}
              />
            </div>
            {errors.password && <p className="text-xs text-amber mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-indigo/50 transition-colors">
              <HiOutlineLockClosed className="text-muted shrink-0" />
              <input
                type="password"
                placeholder="Confirm password"
                className="bg-transparent w-full text-sm focus:outline-none"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-amber mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {serverError && <p className="text-xs text-amber">{serverError}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center flex mt-2">
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="text-xs text-muted mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
