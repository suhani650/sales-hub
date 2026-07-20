import { useRef } from "react";
import {
  FaCloudUploadAlt,
  FaTrash,
  FaStar,
  FaImage,
  FaVideo,
  FaFilePdf,
} from "react-icons/fa";

export default function ImagesInfo({ formData, updateData }) {
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const images = formData.images || [];

  // Upload Images
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const imageList = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      featured: false,
      name: file.name,
      size: file.size,
    }));

    updateData({
      images: [...images, ...imageList],
    });
  };

  // Remove Image
  const removeImage = (id) => {
    updateData({
      images: images.filter((img) => img.id !== id),
    });
  };

  // Featured Image
  const setFeatured = (id) => {
    updateData({
      images: images.map((img) => ({
        ...img,
        featured: img.id === id,
      })),
    });
  };

  // Video Upload
  const uploadVideo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    updateData({
      productVideo: file,
    });
  };

  // PDF Upload
  const uploadPdf = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    updateData({
      productManual: file,
    });
  };

  return (
    <div className="space-y-8">
      {/* Upload Card */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h2 className="text-2xl font-bold">Product Images</h2>

        <p className="text-gray-500 mt-2">
          Upload high quality product images.
        </p>

        <div
          onClick={() => imageInputRef.current.click()}
          className="mt-8 border-2 border-dashed border-blue-300 rounded-xl h-72 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition"
        >
          <FaCloudUploadAlt className="text-blue-500" size={65} />

          <h3 className="mt-5 text-xl font-semibold">Drag & Drop Images</h3>

          <p className="text-gray-500 mt-2">
            JPG, PNG, WEBP (Maximum 10 Images)
          </p>

          <button
            type="button"
            className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Browse Files
          </button>

          <input
            multiple
            hidden
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Gallery */}

      <div className="bg-white rounded-xl shadow border p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Image Gallery</h2>

          <span className="text-gray-500">{images.length} Images</span>
        </div>

        {images.length === 0 ? (
          <div className="py-20 text-center">
            <FaImage className="mx-auto text-gray-300" size={70} />

            <h3 className="mt-4 text-xl font-semibold">No Images Uploaded</h3>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {images.map((image) => (
              <div key={image.id} className="border rounded-xl overflow-hidden">
                <img
                  src={image.preview}
                  alt=""
                  className="h-52 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold truncate">{image.name}</h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {(image.size / 1024).toFixed(1)} KB
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setFeatured(image.id)}
                      className={`flex-1 py-2 rounded-lg ${
                        image.featured
                          ? "bg-yellow-500 text-white"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      <FaStar className="mx-auto" />
                    </button>

                    <button
                      onClick={() => removeImage(image.id)}
                      className="flex-1 bg-red-100 text-red-600 rounded-lg"
                    >
                      <FaTrash className="mx-auto" />
                    </button>
                  </div>

                  {image.featured && (
                    <div className="mt-3 bg-green-100 text-green-700 text-center rounded-lg py-2 text-sm">
                      Featured Image
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Video */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h2 className="text-xl font-bold mb-5">Product Video</h2>

        <div className="flex items-center gap-5">
          <button
            onClick={() => videoInputRef.current.click()}
            className="bg-purple-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
          >
            <FaVideo />
            Upload Video
          </button>

          <span className="text-gray-500">
            {formData.productVideo
              ? formData.productVideo.name
              : "No Video Selected"}
          </span>

          <input
            hidden
            type="file"
            accept="video/*"
            ref={videoInputRef}
            onChange={uploadVideo}
          />
        </div>
      </div>

      {/* Product Manual */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h2 className="text-xl font-bold mb-5">Product Manual / PDF</h2>

        <div className="flex items-center gap-5">
          <button
            onClick={() => pdfInputRef.current.click()}
            className="bg-red-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
          >
            <FaFilePdf />
            Upload PDF
          </button>

          <span className="text-gray-500">
            {formData.productManual
              ? formData.productManual.name
              : "No PDF Uploaded"}
          </span>

          <input
            hidden
            type="file"
            accept=".pdf"
            ref={pdfInputRef}
            onChange={uploadPdf}
          />
        </div>
      </div>
    </div>
  );
}
