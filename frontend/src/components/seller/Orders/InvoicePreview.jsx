import { FaPrint, FaDownload, FaFileInvoiceDollar } from "react-icons/fa";

export default function InvoicePreview({ order }) {
  const data = order || {
    invoiceNo: "INV-2026-001245",

    invoiceDate: "16 Jul 2026",

    seller: {
      name: "Nexora Seller Pvt Ltd",
      gst: "08ABCDE1234F1Z5",
      address: "Jaipur, Rajasthan",
    },

    customer: {
      name: "Rahul Sharma",
      phone: "+91 9876543210",
      address: "221 MG Road, Jaipur",
    },

    payment: {
      method: "UPI",
      status: "PAID",
    },

    items: [
      {
        id: 1,
        name: "iPhone 16 Pro",
        qty: 1,
        price: 129999,
        tax: 18,
      },

      {
        id: 2,
        name: "AirPods Pro",
        qty: 1,
        price: 25999,
        tax: 18,
      },
    ],

    shipping: 0,
  };

  const subtotal = data.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0,
  );

  const gst = subtotal * 0.18;

  const total = subtotal + gst + data.shipping;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaFileInvoiceDollar />
            GST Invoice
          </h1>

          <p className="text-gray-500 mt-2">{data.invoiceNo}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-3 border rounded-xl flex items-center gap-2"
          >
            <FaPrint />
            Print
          </button>

          <button
            className="
            px-5
            py-3
            bg-blue-600
            text-white
            rounded-xl
            flex
            items-center
            gap-2
            "
          >
            <FaDownload />
            Download PDF
          </button>
        </div>
      </div>

      {/* Invoice */}

      <div
        id="invoice"
        className="
        bg-white
        border
        rounded-2xl
        shadow-sm
        p-8
        "
      >
        {/* Company */}

        <div className="flex justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold">{data.seller.name}</h2>

            <p className="text-gray-600 mt-2">{data.seller.address}</p>

            <p className="mt-2">GSTIN: {data.seller.gst}</p>
          </div>

          <div className="text-right">
            <h3 className="font-bold">Invoice No</h3>

            <p>{data.invoiceNo}</p>

            <p className="mt-3">Date: {data.invoiceDate}</p>
          </div>
        </div>

        {/* Customer */}

        <div className="grid md:grid-cols-2 gap-8 py-8 border-b">
          <div>
            <h3 className="font-bold text-lg mb-3">Bill To</h3>

            <p>{data.customer.name}</p>

            <p>{data.customer.phone}</p>

            <p>{data.customer.address}</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Payment</h3>

            <p>Method: {data.payment.method}</p>

            <p>Status: {data.payment.status}</p>
          </div>
        </div>

        {/* Items */}

        <div className="py-8">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-4 text-left">Product</th>

                <th className="p-4 text-center">Qty</th>

                <th className="p-4 text-right">Price</th>

                <th className="p-4 text-right">Tax</th>

                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              {data.items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-4">{item.name}</td>

                  <td className="p-4 text-center">{item.qty}</td>

                  <td className="p-4 text-right">
                    ₹{item.price.toLocaleString()}
                  </td>

                  <td className="p-4 text-right">{item.tax}%</td>

                  <td className="p-4 text-right font-semibold">
                    ₹{(item.qty * item.price).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}

        <div className="flex justify-end">
          <div className="w-full max-w-md">
            <SummaryRow
              label="Subtotal"
              value={`₹${subtotal.toLocaleString()}`}
            />

            <SummaryRow label="Shipping" value={`₹${data.shipping}`} />

            <SummaryRow label="CGST (9%)" value={`₹${(gst / 2).toFixed(2)}`} />

            <SummaryRow label="SGST (9%)" value={`₹${(gst / 2).toFixed(2)}`} />

            <div className="border-t mt-3 pt-3">
              <SummaryRow
                label="Grand Total"
                value={`₹${total.toLocaleString()}`}
                bold
              />
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="border-t mt-10 pt-6 text-center text-gray-500">
          Thank you for your business.
          <br />
          This is a computer generated invoice.
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, bold }) {
  return (
    <div className="flex justify-between py-2">
      <span className={bold ? "font-bold" : ""}>{label}</span>

      <span className={bold ? "font-bold" : ""}>{value}</span>
    </div>
  );
}
