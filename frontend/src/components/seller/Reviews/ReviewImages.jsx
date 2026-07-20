const images = [
  "https://picsum.photos/200?1",
  "https://picsum.photos/200?2",
  "https://picsum.photos/200?3",
  "https://picsum.photos/200?4",
];

export default function ReviewImages() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Customer Images</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="review"
            className="rounded-xl object-cover w-full h-40"
          />
        ))}
      </div>
    </div>
  );
}
