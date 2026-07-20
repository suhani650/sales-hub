import { FaCheckCircle, FaSave, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

export default function PreviewSubmit({ formData, onSubmit, onSaveDraft }) {
  const images = formData.images || [];
  const variants = formData.variants || [];

  const requiredFields = ["productName", "category", "sellingPrice", "stock"];

  const missingFields = requiredFields.filter((field) => !formData[field]);

  const handleDraft = () => {
    if (onSaveDraft) {
      onSaveDraft(formData);
    } else {
      toast.success("Draft Saved Successfully");
    }
  };

  const handleSubmit = () => {
    if (missingFields.length > 0) {
      toast.error(`Please complete: ${missingFields.join(", ")}`);
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log(formData);
      toast.success("Product Submitted Successfully");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h2 className="text-3xl font-bold">Product Preview</h2>

        <p className="text-gray-500 mt-2">
          Review every detail before submitting the product for Admin Approval.
        </p>
      </div>

      {/* Product Preview */}

      <div className="bg-white rounded-xl shadow border p-8">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Images */}

          <div>
            <h3 className="text-xl font-bold mb-5">Product Images</h3>

            {images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {images.map((img) => (
                  <img
                    key={img.id}
                    src={img.preview}
                    alt=""
                    className="rounded-lg h-48 object-cover border"
                  />
                ))}
              </div>
            ) : (
              <div className="h-52 border rounded-lg flex items-center justify-center text-gray-400">
                No Images Uploaded
              </div>
            )}
          </div>

          {/* Basic */}

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Product Details</h3>

            <div className="flex justify-between">
              <span>Name</span>
              <strong>{formData.productName || "--"}</strong>
            </div>

            <div className="flex justify-between">
              <span>Category</span>
              <strong>{formData.category || "--"}</strong>
            </div>

            <div className="flex justify-between">
              <span>Brand</span>
              <strong>{formData.brand || "--"}</strong>
            </div>

            <div className="flex justify-between">
              <span>SKU</span>
              <strong>{formData.sku || "--"}</strong>
            </div>

            <div className="flex justify-between">
              <span>Status</span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h3 className="text-xl font-bold mb-6">Pricing Summary</h3>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-xl p-5">
            <p>MRP</p>
            <h2 className="text-2xl font-bold">₹{formData.mrp || 0}</h2>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p>Selling Price</p>
            <h2 className="text-2xl font-bold">
              ₹{formData.sellingPrice || 0}
            </h2>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <p>Cost Price</p>
            <h2 className="text-2xl font-bold">₹{formData.costPrice || 0}</h2>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5">
            <p>GST</p>
            <h2 className="text-2xl font-bold">{formData.gst || 0}%</h2>
          </div>
        </div>
      </div>

      {/* Inventory */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h3 className="text-xl font-bold mb-6">Inventory Summary</h3>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gray-100 rounded-lg p-5">
            <p>Stock</p>
            <h2 className="text-3xl font-bold">{formData.stock || 0}</h2>
          </div>

          <div className="bg-gray-100 rounded-lg p-5">
            <p>Warehouse</p>
            <h2>{formData.warehouse || "--"}</h2>
          </div>

          <div className="bg-gray-100 rounded-lg p-5">
            <p>Barcode</p>
            <h2>{formData.barcode || "--"}</h2>
          </div>

          <div className="bg-gray-100 rounded-lg p-5">
            <p>Status</p>
            <h2>{formData.stockStatus || "--"}</h2>
          </div>
        </div>
      </div>

      {/* Variants */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h3 className="text-xl font-bold mb-5">Product Variants</h3>

        {variants.length === 0 ? (
          <div className="text-gray-400">No Variants Added</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Color</th>

                <th className="text-left py-3">Size</th>

                <th className="text-left py-3">Price</th>

                <th className="text-left py-3">Stock</th>
              </tr>
            </thead>

            <tbody>
              {variants.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3">{item.color}</td>

                  <td>{item.size}</td>

                  <td>₹{item.price}</td>

                  <td>{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Shipping */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h3 className="text-xl font-bold mb-5">Shipping Summary</h3>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-5">
            <p>Weight</p>
            <h2>{formData.weight || 0} KG</h2>
          </div>

          <div className="bg-blue-50 rounded-lg p-5">
            <p>Shipping</p>
            <h2>{formData.shippingClass || "--"}</h2>
          </div>

          <div className="bg-blue-50 rounded-lg p-5">
            <p>COD</p>
            <h2>{formData.codAvailable ? "Available" : "No"}</h2>
          </div>

          <div className="bg-blue-50 rounded-lg p-5">
            <p>Free Shipping</p>
            <h2>{formData.freeShipping ? "Yes" : "No"}</h2>
          </div>
        </div>
      </div>

      {/* Validation */}

      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-3">Validation</h3>

        {missingFields.length === 0 ? (
          <div className="flex items-center gap-3 text-green-700">
            <FaCheckCircle />
            Product is ready for submission.
          </div>
        ) : (
          <ul className="list-disc ml-6 text-red-600">
            {missingFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Buttons */}

      <div className="flex justify-end gap-4">
        <button
          onClick={handleDraft}
          className="px-6 py-3 rounded-lg bg-gray-700 text-white flex items-center gap-2"
        >
          <FaSave />
          Save Draft
        </button>

        <button
          onClick={handleSubmit}
          className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <FaPaperPlane />
          Submit Product
        </button>
      </div>
    </div>
  );
}
