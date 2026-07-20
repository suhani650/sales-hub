export default function ReviewFilters() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5 grid lg:grid-cols-5 gap-4">
      <input
        type="text"
        placeholder="Search Review..."
        className="border rounded-xl p-3"
      />

      <select className="border rounded-xl p-3">
        <option>All Ratings</option>
        <option>5 Star</option>
        <option>4 Star</option>
        <option>3 Star</option>
        <option>2 Star</option>
        <option>1 Star</option>
      </select>

      <select className="border rounded-xl p-3">
        <option>All Products</option>
      </select>

      <input type="date" className="border rounded-xl p-3" />

      <button className="bg-indigo-600 text-white rounded-xl">
        Apply Filters
      </button>
    </div>
  );
}
