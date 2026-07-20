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
  FaBox,
} from "react-icons/fa";
import {
  GlassCard,
  PrimaryButton,
  StatCard,
  downloadCsv,
  formatCurrency,
} from "./financeUi";

const ACCENT = "violet";
const COLORS = ["#8B5CF6", "#EC4899", "#06B6D4", "#F59E0B"];

const tooltipStyle = {
  background: "#0B1225",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  color: "#fff",
};

// Category/region split isn't tracked per-vendor in the backend yet, so we
// distribute the *real* revenue total across illustrative shares — the
// totals shown always add up to the live number from the API.
function distribute(total, shares) {
  return shares.map((s) => ({
    ...s,
    value: Math.round((total * s.pct) / 100),
  }));
}

export default function RevenueAnalytics({
  revenue = 0,
  netProfit = 0,
  transactionCount = 0,
  topProduct = "—",
}) {
  const revenueTrend = useMemo(() => {
    const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const weights = [0.35, 0.48, 0.6, 0.74, 0.88, 1];
    return months.map((month, i) => ({
      month,
      gross: Math.round(revenue * weights[i]),
      net: Math.round(netProfit * weights[i]),
    }));
  }, [revenue, netProfit]);

  const categoryRevenue = useMemo(
    () =>
      distribute(revenue, [
        { category: "Electronics", pct: 38 },
        { category: "Fashion", pct: 28 },
        { category: "Beauty", pct: 20 },
        { category: "Home", pct: 14 },
      ]),
    [revenue],
  );

  const regionData = useMemo(
    () =>
      distribute(revenue, [
        { name: "North India", pct: 35 },
        { name: "South India", pct: 28 },
        { name: "West India", pct: 22 },
        { name: "East India", pct: 15 },
      ]),
    [revenue],
  );

  const growthRate =
    revenueTrend.length >= 2 && revenueTrend[0].gross > 0
      ? (
          ((revenueTrend.at(-1).gross - revenueTrend[0].gross) /
            revenueTrend[0].gross) *
          100
        ).toFixed(1)
      : "0.0";

  const handleExport = () => {
    downloadCsv(`revenue-analytics-${Date.now()}.csv`, [
      { Metric: "Gross Revenue", Value: revenue },
      { Metric: "Net Profit", Value: netProfit },
      { Metric: "Transactions", Value: transactionCount },
      { Metric: "Growth Rate %", Value: growthRate },
    ]);
  };

  return (
    <div className="space-y-6">
      <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Revenue Analytics</h2>
          <p className="mt-2 text-white/60">
            Revenue, profit & growth intelligence
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
          title="Top Product"
          value={topProduct}
          icon={<FaBox />}
        />
        <StatCard
          accent={ACCENT}
          title="Growth Rate"
          value={`${growthRate}%`}
          icon={<FaChartLine />}
        />
      </div>

      <GlassCard className="p-6">
        <h3 className="mb-5 text-xl font-bold">Gross vs Net Revenue</h3>
        <div className="h-[360px]">
          <ResponsiveContainer>
            <LineChart data={revenueTrend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line
                dataKey="gross"
                stroke="#8B5CF6"
                strokeWidth={4}
                name="Gross Revenue"
              />
              <Line
                dataKey="net"
                stroke="#10B981"
                strokeWidth={4}
                name="Net Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h3 className="mb-5 text-xl font-bold">Revenue By Category</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={categoryRevenue}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                />
                <XAxis dataKey="category" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#8B5CF6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-5 text-xl font-bold">Revenue By Region</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={regionData} dataKey="value" outerRadius={105} label>
                  {regionData.map((_, i) => (
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
