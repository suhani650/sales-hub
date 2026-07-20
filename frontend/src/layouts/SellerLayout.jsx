import { Outlet } from "react-router-dom";
import Sidebar from "../components/seller/Sidebar/Sidebar";
import Navbar from "../components/seller/Navbar/Navbar";

export default function SellerLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1800px] mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
