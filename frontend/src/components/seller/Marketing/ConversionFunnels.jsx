import {
  FaBullseye,
  FaUsers,
  FaShoppingCart,
  FaCreditCard,
  FaMobileAlt,
  FaDesktop,
  FaRobot,
  FaChartLine,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

const funnelStats = [
  {
    title: "Visitors",
    value: "2.48M",
    icon: <FaUsers />,
    color: "bg-blue-500",
    growth: "+18%",
  },
  {
    title: "Product Views",
    value: "1.82M",
    icon: <FaBullseye />,
    color: "bg-indigo-500",
    growth: "+12%",
  },
  {
    title: "Add To Cart",
    value: "624K",
    icon: <FaShoppingCart />,
    color: "bg-orange-500",
    growth: "+8%",
  },
  {
    title: "Orders",
    value: "182K",
    icon: <FaCreditCard />,
    color: "bg-green-500",
    growth: "+16%",
  },
];

const funnel = [
  {
    step: "Visitors",
    users: "2.48M",
    rate: 100,
  },
  {
    step: "Product View",
    users: "1.82M",
    rate: 74,
  },
  {
    step: "Add To Cart",
    users: "624K",
    rate: 34,
  },
  {
    step: "Checkout",
    users: "284K",
    rate: 15,
  },
  {
    step: "Purchase",
    users: "182K",
    rate: 9,
  },
];

const comparison = [
  {
    device: "Mobile",
    conversion: "8.6%",
    revenue: "₹6.8 Cr",
  },
  {
    device: "Desktop",
    conversion: "12.4%",
    revenue: "₹4.4 Cr",
  },
];

export default function ConversionFunnels() {
  return (
    <div className="space-y-6">
      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {funnelStats.map((item) => (
          <div key={item.title} className="bg-white rounded-3xl border p-6">
            <div className="flex justify-between">
              <div
                className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl`}
              >
                {item.icon}
              </div>

              <span className="flex items-center gap-1 text-green-600 font-semibold">
                <FaArrowUp />
                {item.growth}
              </span>
            </div>

            <p className="text-gray-500 mt-5">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Funnel */}

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-3xl border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Conversion Funnel</h2>
          </div>

          <div className="p-6 space-y-6">
            {funnel.map((item) => (
              <div key={item.step}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{item.step}</span>

                  <span>{item.users}</span>
                </div>

                <div className="h-5 rounded-full bg-gray-200">
                  <div
                    className="bg-blue-600 h-5 rounded-full"
                    style={{
                      width: `${item.rate}%`,
                    }}
                  />
                </div>

                <div className="flex justify-end mt-2 text-sm text-gray-500">
                  {item.rate}% Conversion
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI */}

        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 text-white">
          <div className="flex items-center gap-3">
            <FaRobot className="text-3xl" />

            <h2 className="text-2xl font-bold">AI Funnel Insights</h2>
          </div>

          <div className="space-y-5 mt-8">
            <Insight title="Highest Drop" value="Cart → Checkout" />

            <Insight title="Lost Users" value="340K" />

            <Insight title="Optimization" value="Simplify Checkout" />

            <Insight title="Revenue Gain" value="+₹2.4 Cr" />
          </div>
        </div>
      </div>

      {/* Device Comparison */}

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaMobileAlt className="text-green-600" />

            <h2 className="text-xl font-bold">Device Funnel Comparison</h2>
          </div>

          {comparison.map((item) => (
            <div key={item.device} className="border rounded-2xl p-5 mb-4">
              <div className="flex justify-between">
                <span className="font-bold">{item.device}</span>

                {item.device === "Desktop" ? <FaDesktop /> : <FaMobileAlt />}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">
                <Metric label="Conversion" value={item.conversion} />

                <Metric label="Revenue" value={item.revenue} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <h2 className="text-xl font-bold mb-6">Funnel Drop-offs</h2>

          <Drop label="Visitors → Product" value="26%" />

          <Drop label="Product → Cart" value="66%" />

          <Drop label="Cart → Checkout" value="55%" />

          <Drop label="Checkout → Purchase" value="36%" />
        </div>
      </div>
    </div>
  );
}

function Insight({ title, value }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-2">
      <span>{title}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-gray-500 text-sm">{label}</p>
      <h4 className="text-xl font-bold mt-2">{value}</h4>
    </div>
  );
}

function Drop({ label, value }) {
  return (
    <div className="flex justify-between items-center border rounded-xl p-4 mb-4">
      <div className="flex items-center gap-3">
        <FaArrowDown className="text-red-500" />
        <span>{label}</span>
      </div>

      <span className="font-bold text-red-600">{value}</span>
    </div>
  );
}
