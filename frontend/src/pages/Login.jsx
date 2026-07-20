import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HiOutlineSquares2X2, HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { api, setAccessToken } from "../lib/api.js";
import { setUser } from "../store/authSlice.js";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(values) {
    setServerError(null);
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", values);
      setAccessToken(data.accessToken);
      dispatch(setUser(data.user));
      if (data.user.role === "SUPER_ADMIN") navigate("/admin");
      else if (data.user.role === "CUSTOMER") navigate("/dashboard");
      else navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.error || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-4 sm:px-6 py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-sm p-6 sm:p-8"
      >
        <div className="flex items-center gap-2 font-display font-semibold text-lg mb-8">
          <HiOutlineSquares2X2 className="text-indigo" size={22} />
          SALESHUB
        </div>
        <h1 className="font-display text-2xl font-semibold mb-1">Welcome back</h1>
        <p className="text-sm text-muted mb-8">Sign in to your console</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-indigo/50 transition-colors">
              <HiOutlineEnvelope className="text-muted shrink-0" />
              <input
                type="email"
                placeholder="you@company.com"
                className="bg-transparent w-full text-sm focus:outline-none"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && <p className="text-xs text-amber mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-indigo/50 transition-colors">
              <HiOutlineLockClosed className="text-muted shrink-0" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent w-full text-sm focus:outline-none"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {errors.password && <p className="text-xs text-amber mt-1">{errors.password.message}</p>}
          </div>

          {serverError && <p className="text-xs text-amber">{serverError}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center flex mt-2">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-muted mt-6 text-center">
          New here?{" "}
          <Link to="/register" className="text-indigo hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
