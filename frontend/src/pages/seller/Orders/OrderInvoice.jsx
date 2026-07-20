import {
  HiOutlinePrinter,
  HiOutlineArrowDownTray,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { motion } from "framer-motion";

export default function OrderInvoice() {
  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">TAX INVOICE</h1>

            <p className="text-gray-500 mt-2">Invoice #INV-100245</p>
          </div>

          <div className="flex gap-3">
            <button className="border px-4 py-2 rounded-xl flex gap-2 items-center">
              <HiOutlinePrinter />
              Print
            </button>

            <button className="border px-4 py-2 rounded-xl flex gap-2 items-center">
              <HiOutlineArrowDownTray />
              PDF
            </button>

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex gap-2 items-center">
              <HiOutlineEnvelope />
              Email
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="font-bold mb-3">Seller</h3>

            <p>Your Store Pvt Ltd</p>
            <p>GSTIN : 07ABCDE1234A1Z2</p>
            <p>Delhi, India</p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Customer</h3>

            <p>Rahul Sharma</p>
            <p>Noida, Uttar Pradesh</p>
            <p>+91 9876543210</p>
          </div>
        </div>

        <table className="w-full mt-10">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-4">Wireless Headphones</td>

              <td className="text-center">2</td>

              <td className="text-center">₹3500</td>

              <td className="text-center font-semibold">₹7000</td>
            </tr>

            <tr className="border-b">
              <td className="p-4">Bluetooth Speaker</td>

              <td className="text-center">1</td>

              <td className="text-center">₹1240</td>

              <td className="text-center font-semibold">₹1240</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-8">
          <div className="w-80 space-y-3">
            <Row title="Subtotal" value="₹8240" />
            <Row title="GST" value="₹1483" />
            <Row title="Shipping" value="₹120" />
            <Row title="Discount" value="-₹350" />
            <hr />
            <Row title="Grand Total" value="₹9493" bold />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Row({ title, value, bold }) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-bold" : "text-gray-500"}>{title}</span>

      <span className={bold ? "font-bold text-green-600" : ""}>{value}</span>
    </div>
  );
}
