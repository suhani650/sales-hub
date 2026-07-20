export default function OrderSummary() {
  return (
    <div className="bg-white rounded-2xl border p-6 h-fit">
      <h2 className="text-xl font-bold mb-5">Payment Summary</h2>

      <div className="space-y-4">
        <Row title="Subtotal" value="₹8,240" />

        <Row title="Shipping" value="₹120" />

        <Row title="Discount" value="-₹350" />

        <hr />

        <Row title="Grand Total" value="₹8,010" bold />
      </div>

      <button className="w-full mt-8 bg-green-600 text-white rounded-xl py-3">
        Download Invoice
      </button>
    </div>
  );
}

function Row({ title, value, bold }) {
  return (
    <div className="flex justify-between">
      <p className={bold ? "font-bold" : "text-gray-500"}>{title}</p>

      <p className={bold ? "font-bold text-green-600" : "font-medium"}>
        {value}
      </p>
    </div>
  );
}
