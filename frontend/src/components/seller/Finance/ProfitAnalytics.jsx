import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaDownload,
  FaPercentage,
} from "react-icons/fa";
import {
  GlassCard,
  PrimaryButton,
  StatCard,
  downloadCsv,
  formatCurrency,
} from "./financeUi";

const ACCENT = "pink";
const COLORS = ["#EC4899", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"];

const tooltipStyle = {
  background: "#0B1225",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  color: "#fff",
};

function distribute(total, shares) {
  return shares.map((s) => ({
    ...s,
    profit: Math.round((total * s.pct) / 100),
  }));
}

export default function ProfitAnalytics({
  revenue = 0,
  netProfit = 0,
  platformFees = 0,
}) {
  const profitTrend = useMemo(() => {
    const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const weights = [0.35, 0.48, 0.6, 0.74, 0.88, 1];
    return months.map((month, i) => ({
      month,
      revenue: Math.round(revenue * weights[i]),
      expenses: Math.round(platformFees * weights[i] * 3),
      profit: Math.round(netProfit * weights[i]),
    }));
  }, [revenue, netProfit, platformFees]);

  const categoryProfit = useMemo(
    () =>
      distribute(netProfit, [
        { category: "Electronics", pct: 40 },
        { category: "Fashion", pct: 27 },
        { category: "Beauty", pct: 20 },
        { category: "Home", pct: 13 },
      ]),
    [netProfit],
  );

  const expenseBreakdown = [
    { name: "Product Cost", value: 45 },
    { name: "Shipping", value: 20 },
    { name: "Marketing", value: 18 },
    { name: "Platform Fees", value: 10 },
    { name: "Taxes", value: 7 },
  ];

  const margin = revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : "0.0";

  const handleExport = () => {
    downloadCsv(`profit-analytics-${Date.now()}.csv`, [
      { Metric: "Gross Revenue", Value: revenue },
      { Metric: "Platform Fees", Value: platformFees },
      { Metric: "Net Profit", Value: netProfit },
      { Metric: "Profit Margin %", Value: margin },
    ]);
  };

  return (
    <div className="space-y-6">
      <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Profit Analytics</h2>
          <p className="mt-2 text-white/60">
            Profitability & expense intelligence
          </p>
        </div>
        <PrimaryButton accent={ACCENT} onClick={handleExport}>
          <FaDownload />
          Export Report
        </PrimaryButton>
      </GlassCard>

      <div className="grid gap-5 xl:grid-cols-4 md:grid-cols-2">
        <StatCard
          accent={ACCENT}
          title="Gross Revenue"
          value={formatCurrency(revenue)}
          icon={<FaMoneyBillWave />}
        />
        <StatCard
          accent={ACCENT}
          title="Net Profit"
          value={formatCurrency(netProfit)}
          icon={<FaChartLine />}
        />
        <StatCard
          accent={ACCENT}
          title="Profit Margin"
          value={`${margin}%`}
          icon={<FaPercentage />}
        />
        <StatCard
          accent={ACCENT}
          title="Platform Fees"
          value={formatCurrency(platformFees)}
          icon={<FaChartLine />}
        />
      </div>

      <GlassCard className="p-6">
        <h3 className="mb-5 text-xl font-bold">
          Revenue vs Expenses vs Profit
        </h3>
        <div className="h-[380px]">
          <ResponsiveContainer>
            <LineChart data={profitTrend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line dataKey="revenue" stroke="#2563EB" strokeWidth={3} />
              <Line dataKey="expenses" stroke="#EF4444" strokeWidth={3} />
              <Line dataKey="profit" stroke="#10B981" strokeWidth={4} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h3 className="mb-5 text-xl font-bold">Category Profitability</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={categoryProfit}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                />
                <XAxis dataKey="category" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="profit" fill="#EC4899" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-5 text-xl font-bold">Expense Breakdown</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  dataKey="value"
                  outerRadius={105}
                  label
                >
                  {expenseBreakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
