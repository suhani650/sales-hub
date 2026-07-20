import { useMemo, useState } from "react";
import {
  FaUniversity,
  FaPlus,
  FaEdit,
  FaCheckCircle,
  FaDownload,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import {
  GlassCard,
  PrimaryButton,
  GhostButton,
  StatCard,
  SummaryRow,
  downloadCsv,
} from "./financeUi";

const ACCENT = "cyan";

const emptyForm = {
  bankName: "",
  accountHolder: "",
  accountNumber: "",
  ifsc: "",
};

export default function BankAccounts({
  bankName,
  accountHolder,
  accountNumber,
  ifscCode,
  kycStatus,
}) {
  const primaryAccount = useMemo(() => {
    if (!bankName && !accountNumber) return null;
    return {
      id: "PRIMARY",
      bankName: bankName || "Bank Not Configured",
      accountHolder: accountHolder || "-",
      accountNumber: accountNumber || "Not Added",
      ifsc: ifscCode || "-",
      verified: kycStatus === "VERIFIED",
      primary: true,
    };
  }, [bankName, accountHolder, accountNumber, ifscCode, kycStatus]);

  const [extraAccounts, setExtraAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const accounts = [primaryAccount, ...extraAccounts].filter(Boolean);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (account) => {
    setEditingId(account.id);
    setForm({
      bankName: account.bankName,
      accountHolder: account.accountHolder,
      accountNumber: account.accountNumber,
      ifsc: account.ifsc,
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.bankName || !form.accountNumber) return;

    if (editingId && editingId !== "PRIMARY") {
      setExtraAccounts((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...form } : a)),
      );
    } else if (!editingId) {
      setExtraAccounts((prev) => [
        ...prev,
        {
          id: `BANK-${Date.now()}`,
          ...form,
          verified: false,
          primary: false,
        },
      ]);
    }
    setShowForm(false);
  };

  const handleExport = () => {
    downloadCsv(
      `bank-accounts-${Date.now()}.csv`,
      accounts.map((a) => ({
        Bank: a.bankName,
        AccountHolder: a.accountHolder,
        AccountNumber: a.accountNumber,
        IFSC: a.ifsc,
        Verified: a.verified ? "Yes" : "No",
        Primary: a.primary ? "Yes" : "No",
      })),
    );
  };

  const verifiedCount = accounts.filter((a) => a.verified).length;

  return (
    <div className="space-y-6">
      <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Bank Accounts</h2>
          <p className="mt-2 text-white/60">
            Manage settlement and payout accounts
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <GhostButton onClick={handleExport}>
            <FaDownload />
            Export
          </GhostButton>
          <PrimaryButton accent={ACCENT} onClick={openAdd}>
            <FaPlus />
            Add Account
          </PrimaryButton>
        </div>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2">
        <StatCard
          accent={ACCENT}
          title="Total Accounts"
          value={accounts.length}
          icon={<FaUniversity />}
        />
        <StatCard
          accent={ACCENT}
          title="Verified"
          value={verifiedCount}
          icon={<FaCheckCircle />}
        />
        <StatCard
          accent={ACCENT}
          title="Pending Verification"
          value={accounts.length - verifiedCount}
          icon={<FaCheckCircle />}
        />
        <StatCard
          accent={ACCENT}
          title="Primary Account"
          value={primaryAccount?.bankName?.split(" ")[0] || "None"}
          icon={<FaStar />}
        />
      </div>

      {showForm && (
        <GlassCard className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-bold">
              {editingId ? "Edit Account" : "Add New Account"}
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="rounded-lg p-2 text-white/60 hover:bg-white/10"
            >
              <FaTimes />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Bank Name"
              value={form.bankName}
              onChange={(e) => setForm({ ...form, bankName: e.target.value })}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30"
            />
            <input
              placeholder="Account Holder"
              value={form.accountHolder}
              onChange={(e) =>
                setForm({ ...form, accountHolder: e.target.value })
              }
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30"
            />
            <input
              placeholder="Account Number"
              value={form.accountNumber}
              onChange={(e) =>
                setForm({ ...form, accountNumber: e.target.value })
              }
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30"
            />
            <input
              placeholder="IFSC Code"
              value={form.ifsc}
              onChange={(e) => setForm({ ...form, ifsc: e.target.value })}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30"
            />
          </div>

          <PrimaryButton accent={ACCENT} className="mt-5" onClick={handleSave}>
            Save Account
          </PrimaryButton>
        </GlassCard>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {accounts.length === 0 && (
          <GlassCard className="p-6 text-white/50">
            No bank accounts added yet. Click "Add Account" to configure your
            first settlement account.
          </GlassCard>
        )}

        {accounts.map((account) => (
          <GlassCard key={account.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <FaUniversity className="text-2xl text-cyan-300" />
                  <h3 className="text-lg font-bold">{account.bankName}</h3>
                  {account.primary && (
                    <span className="flex items-center gap-1 rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-300">
                      <FaStar />
                      Primary
                    </span>
                  )}
                </div>

                <p className="mt-3 text-white/60">{account.accountHolder}</p>
                <p className="mt-1 font-semibold">{account.accountNumber}</p>
                <p className="mt-1 text-sm text-white/50">
                  IFSC: {account.ifsc}
                </p>
              </div>

              <button
                onClick={() => openEdit(account)}
                className="rounded-xl bg-cyan-500/15 p-3 text-cyan-300 transition hover:bg-cyan-500/25"
              >
                <FaEdit />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-sm text-white/50">Verification Status</span>
              {account.verified ? (
                <span className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  <FaCheckCircle />
                  Verified
                </span>
              ) : (
                <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-300">
                  Pending
                </span>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <h3 className="mb-5 text-xl font-bold">Banking Security</h3>
        <div className="space-y-4">
          <SummaryRow
            label="KYC Status"
            value={kycStatus || "NOT_SUBMITTED"}
            highlight={kycStatus === "VERIFIED"}
          />
          <SummaryRow
            label="Payout Eligibility"
            value={primaryAccount ? "Active" : "Blocked"}
            highlight={Boolean(primaryAccount)}
          />
          <SummaryRow
            label="Settlement Account"
            value={primaryAccount ? "Configured" : "Not Configured"}
          />
          <SummaryRow
            label="Document Verification"
            value={kycStatus === "VERIFIED" ? "Completed" : "Pending"}
          />
        </div>
      </GlassCard>
    </div>
  );
}
