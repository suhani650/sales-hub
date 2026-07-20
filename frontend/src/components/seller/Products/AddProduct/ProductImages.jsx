import { useRef } from "react";
import { FaCloudUploadAlt, FaStar, FaTrash, FaImage } from "react-icons/fa";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ProductImages({ product, setProduct }) {
  const inputRef = useRef(null);

  const images = product.images || [];

  const handleFiles = (files) => {
    const validFiles = [];

    [...files].forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`${file.name} is not supported.`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} exceeds 5MB.`);
        return;
      }

      validFiles.push({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        featured: images.length === 0 && validFiles.length === 0,
        progress: 0,
      });
    });

    setProduct((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...validFiles],
    }));
  };

  const onInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (id) => {
    const updated = images.filter((img) => img.id !== id);

    if (updated.length && !updated.some((img) => img.featured)) {
      updated[0].featured = true;
    }

    setProduct((prev) => ({
      ...prev,
      images: updated,
    }));
  };

  const setFeatured = (id) => {
    const updated = images.map((img) => ({
      ...img,
      featured: img.id === id,
    }));

    setProduct((prev) => ({
      ...prev,
      images: updated,
    }));
  };

  const moveImage = (index, direction) => {
    const newImages = [...images];

    const target = index + direction;

    if (target < 0 || target >= newImages.length) return;

    [newImages[index], newImages[target]] = [
      newImages[target],
      newImages[index],
    ];

    setProduct((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold">Product Images</h2>

        <p className="text-gray-500 mt-2">
          Upload high-quality product images.
        </p>
      </div>

      {/* Upload Area */}

      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="border-2 border-dashed border-blue-300 rounded-xl p-12 cursor-pointer text-center  transition"
      >
        <FaCloudUploadAlt className="mx-auto text-blue-600" size={60} />

        <h3 className="mt-5 text-xl font-semibold">Drag & Drop Images</h3>

        <p className="text-gray-500 mt-2">JPG • PNG • WEBP</p>

        <button
          type="button"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Browse Images
        </button>

        <input
          ref={inputRef}
          hidden
          multiple
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={onInputChange}
        />
      </div>

      {/* Gallery */}

      {images.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="
relative
overflow-hidden
rounded-[32px]
border border-cyan-500/20
bg-[#0B1220]
bg-gradient-to-br
from-[#0B1220]
via-[#101A2E]
to-[#172554]
shadow-[0_0_60px_rgba(0,255,255,.08)]
before:absolute
before:inset-0
before:bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,.15),transparent_45%)]
before:pointer-events-none
p-8
"
            >
              <div className="relative">
                <img
                  src={image.preview}
                  alt=""
                  className="h-56 w-full object-cover"
                />

                {image.featured && (
                  <span className="absolute top-3 left-3 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-2 space-y-3">
                <button
                  onClick={() => setFeatured(image.id)}
                  className="
relative
overflow-hidden
rounded-[15px]
border border-cyan-500/20
bg-[#0B1220]
bg-gradient-to-br
from-[#0B1220]
via-[#101A2E]
to-[#172554]
shadow-[0_0_60px_rgba(0,255,255,.08)]
before:absolute
before:inset-0
before:bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,.15),transparent_45%)]
before:pointer-events-none
p-8
"
                >
                  <FaStar />
                  Set Featured
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => moveImage(index, -1)}
                    className="
relative
overflow-hidden
rounded-[32px]
border border-cyan-500/20
bg-[#0B1220]
bg-gradient-to-br
from-[#0B1220]
via-[#101A2E]
to-[#172554]
shadow-[0_0_60px_rgba(0,255,255,.08)]
before:absolute
before:inset-0
before:bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,.15),transparent_45%)]
before:pointer-events-none
p-8
"
                  >
                    ↑
                  </button>

                  <button
                    onClick={() => moveImage(index, 1)}
                    className="
relative
overflow-hidden
rounded-[32px] 
border border-cyan-500/20
bg-[#0B1220]
bg-gradient-to-br
from-[#0B1220]
via-[#101A2E]
to-[#172554]
shadow-[0_0_60px_rgba(0,255,255,.08)]
before:absolute
before:inset-0
before:bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,.15),transparent_45%)]
before:pointer-events-none
p-8
"
                  >
                    ↓
                  </button>
                </div>

                <button
                  onClick={() => removeImage(image.id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 flex justify-center items-center gap-2"
                >
                  <FaTrash />
                  Remove
                </button>

                <p className="text-center text-sm text-cyan-400 font-semibold mt-2">
                  Ready to Upload
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-16 border rounded-xl">
          <FaImage className="mx-auto text-gray-400" size={60} />

          <p className="mt-4 text-gray-500">No images uploaded yet.</p>
        </div>
      )}
    </div>
  );
}
