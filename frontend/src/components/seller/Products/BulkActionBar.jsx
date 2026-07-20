import {
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaArchive,
  FaEye,
  FaEyeSlash,
  FaFileExport,
  FaStar,
  FaTags,
  FaBoxes,
} from "react-icons/fa";

export default function BulkActionBar({
  selectedCount = 0,
  onApprove = () => {},
  onReject = () => {},
  onDelete = () => {},
  onArchive = () => {},
  onPublish = () => {},
  onUnpublish = () => {},
  onExport = () => {},
  onFeature = () => {},
  onDiscount = () => {},
  onStockUpdate = () => {},
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg text-white p-5">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Bulk Actions</h2>

          <p className="text-blue-100 mt-1">
            {selectedCount} product
            {selectedCount > 1 ? "s" : ""} selected
          </p>
        </div>

        <div className="text-sm bg-white/20 px-4 py-2 rounded-full">
          Ready for Bulk Operations
        </div>
      </div>

      {/* Actions */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-6">
        <button
          onClick={onApprove}
          className="bg-green-500 hover:bg-green-600 rounded-lg p-4 flex flex-col items-center gap-2 transition"
        >
          <FaCheckCircle size={22} />
          <span>Approve</span>
        </button>

        <button
          onClick={onReject}
          className="bg-yellow-500 hover:bg-yellow-600 rounded-lg p-4 flex flex-col items-center gap-2 transition"
        >
          <FaTimesCircle size={22} />
          <span>Reject</span>
        </button>

        <button
          onClick={onArchive}
          className="bg-gray-700 hover:bg-gray-800 rounded-lg p-4 flex flex-col items-center gap-2 transition"
        >
          <FaArchive size={22} />
          <span>Archive</span>
        </button>

        <button
          onClick={onPublish}
          className="bg-indigo-500 hover:bg-indigo-600 rounded-lg p-4 flex flex-col items-center gap-2 transition"
        >
          <FaEye size={22} />
          <span>Publish</span>
        </button>

        <button
          onClick={onUnpublish}
          className="bg-orange-500 hover:bg-orange-600 rounded-lg p-4 flex flex-col items-center gap-2 transition"
        >
          <FaEyeSlash size={22} />
          <span>Unpublish</span>
        </button>

        <button
          onClick={onFeature}
          className="bg-pink-500 hover:bg-pink-600 rounded-lg p-4 flex flex-col items-center gap-2 transition"
        >
          <FaStar size={22} />
          <span>Featured</span>
        </button>

        <button
          onClick={onDiscount}
          className="bg-cyan-600 hover:bg-cyan-700 rounded-lg p-4 flex flex-col items-center gap-2 transition"
        >
          <FaTags size={22} />
          <span>Discount</span>
        </button>

        <button
          onClick={onStockUpdate}
          className="bg-purple-600 hover:bg-purple-700 rounded-lg p-4 flex flex-col items-center gap-2 transition"
        >
          <FaBoxes size={22} />
          <span>Stock</span>
        </button>

        <button
          onClick={onExport}
          className="bg-blue-500 hover:bg-blue-700 rounded-lg p-4 flex flex-col items-center gap-2 transition"
        >
          <FaFileExport size={22} />
          <span>Export</span>
        </button>

        <button
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 rounded-lg p-4 flex flex-col items-center gap-2 transition"
        >
          <FaTrash size={22} />
          <span>Delete</span>
        </button>
      </div>

      {/* Footer */}

      <div className="mt-6 border-t border-white/20 pt-4 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-blue-100">
        <p>Bulk operations will be applied to all selected products.</p>

        <p>
          Selected: <strong>{selectedCount}</strong>
        </p>
      </div>
    </div>
  );
}
