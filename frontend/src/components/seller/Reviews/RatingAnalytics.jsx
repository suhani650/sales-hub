const ratings = [
  { star: 5, count: 3284 },
  { star: 4, count: 746 },
  { star: 3, count: 154 },
  { star: 2, count: 62 },
  { star: 1, count: 40 },
];

export default function RatingAnalytics() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-8">Rating Analytics</h2>

      <div className="space-y-6">
        {ratings.map((item) => (
          <div key={item.star} className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2">{item.star} ⭐</div>

            <div className="col-span-8 bg-gray-200 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{
                  width: `${(item.count / 3284) * 100}%`,
                }}
              />
            </div>

            <div className="col-span-2 font-semibold">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
