import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaDownload,
  FaCopy,
  FaStar,
} from "react-icons/fa";

export default function ProductGallery({ images = [] }) {
  const gallery =
    images.length > 0
      ? images
      : [
          {
            id: 1,
            url: "https://via.placeholder.com/800x800?text=Product+Image",
            featured: true,
          },
        ];

  const [selected, setSelected] = useState(0);

  const currentImage = gallery[selected];

  const previousImage = () => {
    setSelected((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelected((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const copyImageUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentImage.url);
      alert("Image URL copied!");
    } catch {
      alert("Failed to copy.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      {/* Header */}

      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-bold">Product Gallery</h2>

          <p className="text-gray-500 text-sm">
            {selected + 1} / {gallery.length} Images
          </p>
        </div>

        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-lg border hover:bg-gray-100 transition">
            <FaExpand />
          </button>

          <a
            href={currentImage.url}
            download
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-gray-100 transition"
          >
            <FaDownload />
          </a>

          <button
            onClick={copyImageUrl}
            className="w-10 h-10 rounded-lg border hover:bg-gray-100 transition"
          >
            <FaCopy />
          </button>
        </div>
      </div>

      {/* Main Image */}

      <div className="relative">
        <img
          src={currentImage.url}
          alt="Product"
          className="w-full h-[500px] object-cover rounded-xl border"
        />

        {currentImage.featured && (
          <span className="absolute top-4 left-4 bg-yellow-400 text-black px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold">
            <FaStar />
            Featured
          </span>
        )}

        {/* Navigation */}

        {gallery.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}

      <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 mt-6">
        {gallery.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setSelected(index)}
            className={`relative border-2 rounded-xl overflow-hidden transition ${
              selected === index ? "border-blue-600" : "border-transparent"
            }`}
          >
            <img src={img.url} alt="" className="w-full h-24 object-cover" />

            {img.featured && (
              <div className="absolute top-1 right-1 bg-yellow-400 rounded-full p-1">
                <FaStar size={10} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Image Details */}

      <div className="grid md:grid-cols-4 gap-5 mt-8">
        <div className="border rounded-xl p-4">
          <p className="text-gray-500 text-sm">Resolution</p>

          <h4 className="font-semibold mt-1">2000 × 2000 px</h4>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500 text-sm">Format</p>

          <h4 className="font-semibold mt-1">JPG</h4>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500 text-sm">Size</p>

          <h4 className="font-semibold mt-1">1.8 MB</h4>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500 text-sm">Cloud Storage</p>

          <h4 className="font-semibold mt-1">Cloudinary</h4>
        </div>
      </div>
    </div>
  );
}
