export default function OrderFilters() {
  return (
    <div className="bg-white rounded-2xl border p-5 grid lg:grid-cols-5 gap-4">
      <input
        type="text"
        placeholder="Search Order..."
        className="border rounded-xl px-4 py-3"
      />

      <select className="border rounded-xl px-4 py-3">
        <option>All Status</option>
        <option>Pending</option>
        <option>Processing</option>
        <option>Packed</option>
        <option>Shipped</option>
        <option>Delivered</option>
      </select>

      <select className="border rounded-xl px-4 py-3">
        <option>Payment</option>
        <option>Paid</option>
        <option>Pending</option>
      </select>

      <input type="date" className="border rounded-xl px-4 py-3" />

      <button className="bg-indigo-600 text-white rounded-xl">
        Apply Filters
      </button>
    </div>
  );
}
