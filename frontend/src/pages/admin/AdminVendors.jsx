import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { api } from "../../lib/api.js";
import GlassCard from "../../components/GlassCard.jsx";
import SkeletonCard from "../../components/SkeletonCard.jsx";

const STATUS_STYLES = {
  PENDING: "bg-amber/15 text-amber",
  APPROVED: "bg-emerald-500/15 text-emerald-400",
  SUSPENDED: "bg-red-500/15 text-red-400",
  REJECTED: "bg-panel2 text-muted",
};

export default function AdminVendors() {
  const qc = useQueryClient();
  const { data: vendors, isLoading, isError } = useQuery({
    queryKey: ["admin-vendors"],
    queryFn: () => api.get("/admin/vendors").then((r) => r.data),
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }) => api.patch(`/admin/vendors/${id}/status`, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-vendors"] }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Vendors</h1>
        <p className="text-sm text-muted mt-1">Review applications and manage store status</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : isError || !vendors ? (
        <GlassCard tilt={false} className="text-sm text-amber">
          Couldn't load vendors list. Is the backend running on :5000?
        </GlassCard>
      ) : (
        <div className="grid gap-4">
          {vendors.map((v, i) => (
            <motion.div key={v.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <GlassCard tilt={false} className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo to-cyan flex items-center justify-center font-display font-semibold shrink-0">
                    {v.storeName[0]}
                  </div>
                  <div>
                    <div className="font-medium">{v.storeName}</div>
                    <div className="text-xs text-muted mt-0.5">
                      {v.user.name} · {v.user.email} · {v._count.products} products
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full ${STATUS_STYLES[v.status]}`}>{v.status}</span>
                  {v.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => mutation.mutate({ id: v.id, status: "APPROVED" })}
                        className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => mutation.mutate({ id: v.id, status: "REJECTED" })}
                        className="text-xs px-3 py-1.5 rounded-lg bg-panel2 text-muted hover:text-ink transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {v.status === "APPROVED" && (
                    <button
                      onClick={() => mutation.mutate({ id: v.id, status: "SUSPENDED" })}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors"
                    >
                      Suspend
                    </button>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
