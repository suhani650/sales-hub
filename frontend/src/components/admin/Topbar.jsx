import { useSelector, useDispatch } from "react-redux";
import { HiOutlineMagnifyingGlass, HiOutlineBell, HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { toggleTheme } from "../../store/uiSlice.js";

export default function Topbar() {
  const user = useSelector((s) => s.auth.user);
  const theme = useSelector((s) => s.ui.theme);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-30 glass border-b border-white/[0.06] px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3.5 py-2 w-full max-w-sm">
        <HiOutlineMagnifyingGlass className="text-muted shrink-0" size={17} />
        <input
          placeholder="Search vendors, orders, products…"
          className="bg-transparent text-sm w-full focus:outline-none placeholder:text-muted"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-full hover:bg-white/[0.06] text-muted transition-colors"
        >
          {theme === "dark" ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
        </button>
        <button className="relative p-2 rounded-full hover:bg-white/[0.06] text-muted transition-colors">
          <HiOutlineBell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber" />
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-white/[0.08]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo to-cyan flex items-center justify-center text-xs font-semibold">
            {user?.name?.[0] ?? "A"}
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-sm">{user?.name ?? "Admin"}</div>
            <div className="text-xs text-muted">{user?.role ?? "SUPER_ADMIN"}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
