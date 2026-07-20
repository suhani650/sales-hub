import {
  FaShoppingCart,
  FaRupeeSign,
  FaSyncAlt,
  FaChartLine,
  FaBoxOpen,
  FaTruck,
  FaCreditCard,
  FaRobot,
} from "react-icons/fa";

export default function PurchaseHistory() {
  const orders = [
    {
      id: "ORD-1001",
      customer: "Rahul Sharma",
      date: "12 Jul 2026",
      product: "Wireless Headphones",
      amount: "₹2,499",
      payment: "UPI",
      shipping: "Delivered",
    },
    {
      id: "ORD-1002",
      customer: "Priya Verma",
      date: "10 Jul 2026",
      product: "Smart Watch",
      amount: "₹4,999",
      payment: "Card",
      shipping: "Shipped",
    },
    {
      id: "ORD-1003",
      customer: "Amit Patel",
      date: "08 Jul 2026",
      product: "Bluetooth Speaker",
      amount: "₹1,899",
      payment: "Net Banking",
      shipping: "Delivered",
    },
  ];

  const topCustomers = [
    {
      name: "Amit Patel",
      orders: 38,
      spent: "₹86,400",
    },
    {
      name: "Rahul Sharma",
      orders: 24,
      spent: "₹42,800",
    },
    {
      name: "Priya Verma",
      orders: 12,
      spent: "₹18,500",
    },
  ];

  const predictions = [
    {
      customer: "Rahul Sharma",
      nextPurchase: "85%",
      recommendation: "Smart Watch",
    },
    {
      customer: "Priya Verma",
      nextPurchase: "72%",
      recommendation: "Fitness Band",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-3xl font-bold">Purchase Intelligence Center</h2>

        <p className="text-gray-500 mt-2">
          Customer Orders, Trends & AI Predictions
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <KpiCard
          title="Total Orders"
          value="48,240"
          icon={<FaShoppingCart />}
        />

        <KpiCard title="Revenue" value="₹2.4Cr" icon={<FaRupeeSign />} />

        <KpiCard title="Repeat Purchases" value="68%" icon={<FaSyncAlt />} />

        <KpiCard title="Purchase Growth" value="+22%" icon={<FaChartLine />} />
      </div>

      {/* Order History */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-xl">Complete Purchase History</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Shipping</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.product}</td>
                <td className="p-4 text-green-600 font-semibold">
                  {order.amount}
                </td>
                <td className="p-4">{order.payment}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {order.shipping}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Customers */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-5">Top Customers</h3>

        <div className="grid md:grid-cols-3 gap-5">
          {topCustomers.map((customer) => (
            <div key={customer.name} className="border rounded-2xl p-5">
              <h4 className="font-bold">{customer.name}</h4>

              <p className="text-gray-500 mt-2">Orders: {customer.orders}</p>

              <p className="text-green-600 font-semibold mt-2">
                {customer.spent}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics */}

      <div className="grid lg:grid-cols-3 gap-5">
        <AnalyticsCard
          icon={<FaBoxOpen />}
          title="Product Affinity"
          value="Electronics + Accessories"
        />

        <AnalyticsCard
          icon={<FaCreditCard />}
          title="Top Payment Method"
          value="UPI (48%)"
        />

        <AnalyticsCard
          icon={<FaTruck />}
          title="Shipping Success"
          value="98.6%"
        />
      </div>

      {/* AI Predictions */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-blue-600 text-2xl" />

          <h3 className="font-bold text-xl">AI Purchase Predictions</h3>
        </div>

        <div className="space-y-4">
          {predictions.map((item) => (
            <div key={item.customer} className="border rounded-xl p-4">
              <h4 className="font-semibold">{item.customer}</h4>

              <p className="text-gray-500 mt-1">
                Purchase Probability: {item.nextPurchase}
              </p>

              <p className="text-blue-600 mt-2 font-medium">
                Recommended Product: {item.recommendation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-blue-600 text-3xl">{icon}</div>

      <p className="text-gray-500 mt-4">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function AnalyticsCard({ icon, title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <div className="text-3xl text-blue-600 flex justify-center">{icon}</div>

      <h4 className="font-bold mt-4">{title}</h4>

      <p className="text-gray-500 mt-2">{value}</p>
    </div>
  );
}
