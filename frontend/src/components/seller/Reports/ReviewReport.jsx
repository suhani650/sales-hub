const ratings = [
  {
    stars: "★★★★★",
    total: 3245,
  },
  {
    stars: "★★★★☆",
    total: 842,
  },
  {
    stars: "★★★☆☆",
    total: 215,
  },
  {
    stars: "★★☆☆☆",
    total: 48,
  },
  {
    stars: "★☆☆☆☆",
    total: 20,
  },
];

export default function ReviewReport() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Rating Summary</h2>

      {ratings.map((rating) => (
        <div key={rating.stars} className="flex justify-between border-b py-3">
          <span>{rating.stars}</span>

          <span className="font-semibold">{rating.total}</span>
        </div>
      ))}
    </div>
  );
}
