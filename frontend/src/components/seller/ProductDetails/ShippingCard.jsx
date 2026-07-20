import {
  FaBox,
  FaWeightHanging,
  FaRulerCombined,
  FaTruck,
  FaGlobeAsia,
  FaClock,
  FaMoneyBillWave,
  FaShippingFast,
  FaMapMarkedAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function ShippingCard({ product }) {
  const {
    weight = 1.2,
    dimensions = {
      length: 20,
      width: 15,
      height: 8,
    },
    shippingClass = "Standard",
    deliveryTime = "3-5 Days",
    shippingCost = 99,
    packaging = "Corrugated Box",
    courierPartners = ["BlueDart", "Delhivery", "DTDC", "XpressBees"],
    deliveryZones = ["North India", "South India", "West India", "East India"],
    freeShippingAbove = 999,
    shippedOrders = 1260,
    deliveredOrders = 1228,
    cancelledOrders = 18,
    returnedOrders = 14,
  } = product;

  const deliveryRate =
    shippedOrders > 0
      ? ((deliveredOrders / shippedOrders) * 100).toFixed(1)
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-2xl border shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Shipping Information</h2>

          <p className="text-gray-500 mt-1">Shipping & logistics overview</p>
        </div>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
          <FaTruck />
          Shipping Enabled
        </span>
      </div>

      {/* KPI */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <Card
          icon={<FaWeightHanging />}
          title="Weight"
          value={`${weight} kg`}
          color="blue"
        />

        <Card
          icon={<FaTruck />}
          title="Shipping Cost"
          value={`₹${shippingCost}`}
          color="green"
        />

        <Card
          icon={<FaClock />}
          title="Delivery"
          value={deliveryTime}
          color="orange"
        />

        <Card
          icon={<FaShippingFast />}
          title="Shipping Class"
          value={shippingClass}
          color="purple"
        />
      </div>

      {/* Main */}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Product Details */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-lg mb-5">Package Details</h3>

          <Info
            icon={<FaWeightHanging />}
            label="Weight"
            value={`${weight} kg`}
          />

          <Info
            icon={<FaRulerCombined />}
            label="Dimensions"
            value={`${dimensions.length} × ${dimensions.width} × ${dimensions.height} cm`}
          />

          <Info icon={<FaBox />} label="Packaging" value={packaging} />

          <Info
            icon={<FaMoneyBillWave />}
            label="Free Shipping Above"
            value={`₹${freeShippingAbove}`}
          />
        </div>

        {/* Delivery */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-lg mb-5">Delivery Zones</h3>

          <div className="space-y-3">
            {deliveryZones.map((zone) => (
              <div
                key={zone}
                className="flex items-center gap-3 border rounded-xl p-3"
              >
                <FaMapMarkedAlt className="text-blue-600" />

                {zone}
              </div>
            ))}
          </div>
        </div>

        {/* Courier */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-lg mb-5">Courier Partners</h3>

          <div className="space-y-3">
            {courierPartners.map((partner) => (
              <div
                key={partner}
                className="flex items-center justify-between border rounded-xl p-3"
              >
                <span>{partner}</span>

                <FaCheckCircle className="text-green-600" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold mb-5">Shipping Performance</h3>

          <AnalyticsRow label="Orders Shipped" value={shippedOrders} />

          <AnalyticsRow label="Delivered" value={deliveredOrders} />

          <AnalyticsRow label="Cancelled" value={cancelledOrders} />

          <AnalyticsRow label="Returned" value={returnedOrders} />

          <AnalyticsRow
            label="Delivery Rate"
            value={`${deliveryRate}%`}
            success
          />
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex justify-between mb-6">
            <h3 className="font-bold">Delivery Coverage</h3>

            <FaGlobeAsia className="text-blue-600 text-2xl" />
          </div>

          <div className="h-72 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-400">
            🌍 Delivery Coverage Map
            <br />
            (Google Maps API Ready)
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${colors[color]}`}
      >
        {icon}
      </div>

      <p className="text-gray-500 mt-4">{title}</p>

      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b">
      <div className="flex items-center gap-3 text-gray-600">
        {icon}
        {label}
      </div>

      <span className="font-semibold">{value}</span>
    </div>
  );
}

function AnalyticsRow({ label, value, success }) {
  return (
    <div className="flex justify-between py-3 border-b">
      <span className="text-gray-600">{label}</span>

      <span className={`font-bold ${success ? "text-green-600" : ""}`}>
        {value}
      </span>
    </div>
  );
}
