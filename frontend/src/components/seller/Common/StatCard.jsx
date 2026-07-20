export default function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className={`w-12 h-12 rounded-lg ${color} mb-4`} />

      <p className="text-gray-500">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
