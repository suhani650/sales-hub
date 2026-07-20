import { HiOutlinePrinter, HiOutlineArrowDownTray } from "react-icons/hi2";

export default function ShippingLabels() {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h2 className="text-xl font-bold mb-5">Shipping Label</h2>

      <div className="border rounded-xl p-6 bg-gray-50">
        <p>
          Shipment :<strong> SHIP1001</strong>
        </p>

        <p className="mt-2">
          Courier :<strong> Delhivery</strong>
        </p>

        <p className="mt-2">
          Tracking :<strong> DL123456789</strong>
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <button className="bg-indigo-600 text-white rounded-xl px-5 py-3 flex gap-2 items-center">
          <HiOutlinePrinter />
          Print
        </button>

        <button className="border rounded-xl px-5 py-3 flex gap-2 items-center">
          <HiOutlineArrowDownTray />
          Download PDF
        </button>
      </div>
    </div>
  );
}
