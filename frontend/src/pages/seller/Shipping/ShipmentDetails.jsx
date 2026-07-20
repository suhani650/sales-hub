import { motion } from "framer-motion";
import DeliveryTracking from "../../../components/seller/Shipping/DeliveryTracking";
import ShippingLabels from "../../../components/seller/Shipping/ShippingLabels";
import ShippingAnalytics from "../../../components/seller/Shipping/ShippingAnalytics";

export default function ShipmentDetails() {
  const shipment = {
    shipmentId: "#SHIP1001",
    orderId: "#ORD10245",
    customer: "Rahul Sharma",
    courier: "Delhivery",
    tracking: "DL123456789",
    status: "In Transit",
    expected: "22 Jul 2026",
    address: "Sector 62, Noida, Uttar Pradesh",
  };

  return (
    <motion.div
      className="space-y-6 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white rounded-2xl border p-6">
        <h1 className="text-3xl font-bold">Shipment Details</h1>

        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <Info label="Shipment ID" value={shipment.shipmentId} />
          <Info label="Order ID" value={shipment.orderId} />
          <Info label="Customer" value={shipment.customer} />
          <Info label="Courier" value={shipment.courier} />
          <Info label="Tracking" value={shipment.tracking} />
          <Info label="Status" value={shipment.status} />
          <Info label="Expected Delivery" value={shipment.expected} />
        </div>

        <div className="mt-6">
          <p className="text-gray-500">Delivery Address</p>

          <h3 className="font-semibold mt-2">{shipment.address}</h3>
        </div>
      </div>

      <DeliveryTracking />

      <ShippingLabels />

      <ShippingAnalytics />
    </motion.div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <h4 className="font-semibold mt-1">{value}</h4>
    </div>
  );
}
