import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api, setAccessToken } from "../lib/api.js";
import { setUser, clearUser } from "../store/authSlice.js";

/**
 * On first mount, tries to silently refresh the session (via the httpOnly
 * cookie) so a page reload doesn't bounce an authenticated user to /login.
 */
export default function ProtectedRoute({ allow }) {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (user) {
      setChecked(true);
      return;
    }
    api
      .post("/auth/refresh")
      .then(async ({ data }) => {
        setAccessToken(data.accessToken);
        const me = await api.get("/auth/me");
        dispatch(setUser(me.data));
      })
      .catch(() => dispatch(clearUser()))
      .finally(() => setChecked(true));
  }, []);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void">
        <div className="w-10 h-10 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (allow && !allow.includes(user.role)) return <Navigate to="/login" replace />;

  return <Outlet />;
}
