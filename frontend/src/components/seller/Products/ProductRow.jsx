import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCopy,
  FaStar,
  FaEllipsisV,
  FaBan,
} from "react-icons/fa";
import { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function ProductRow({
  product,
  checked,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
}) {
  const [showMenu, setShowMenu] = useState(false);

  const isLowStock = product.stock <= 10;

  return (
    <tr className="border-b hover:bg-blue-50 transition-all duration-200">
      {/* Checkbox */}

      <td className="p-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={onSelect}
          className="w-4 h-4"
        />
      </td>

      {/* Image */}

      <td className="p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 rounded-lg border object-cover"
        />
      </td>

      {/* Product */}

      <td className="p-4">
        <div>
          <h3 className="font-semibold text-gray-800">{product.name}</h3>

          <p className="text-sm text-gray-500">ID : #{product.id}</p>
        </div>
      </td>

      {/* SKU */}

      <td className="p-4">
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {product.sku}
        </span>
      </td>

      {/* Category */}

      <td className="p-4">{product.category}</td>

      {/* Brand */}

      <td className="p-4">{product.brand}</td>

      {/* Price */}

      <td className="p-4">
        <div>
          <p className="font-bold text-blue-600">₹{product.price}</p>

          {product.oldPrice && (
            <p className="text-xs text-gray-400 line-through">
              ₹{product.oldPrice}
            </p>
          )}
        </div>
      </td>

      {/* Stock */}

      <td className="p-4">
        <div>
          <p
            className={`font-semibold ${
              isLowStock ? "text-red-600" : "text-green-600"
            }`}
          >
            {product.stock}
          </p>

          {isLowStock && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
              Low Stock
            </span>
          )}
        </div>
      </td>

      {/* Sales */}

      <td className="p-4">
        <div className="font-semibold">{product.sales}</div>
      </td>

      {/* Rating */}

      <td className="p-4">
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-400" />

          <span>{product.rating}</span>
        </div>
      </td>

      {/* Status */}

      <td className="p-4">
        <StatusBadge status={product.status} />
      </td>

      {/* Actions */}

      <td className="p-4 text-center relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 rounded hover:bg-gray-100"
        >
          <FaEllipsisV />
        </button>

        {showMenu && (
          <div className="absolute right-4 top-12 w-48 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
            <button
              onClick={() => {
                onView();
                setShowMenu(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50"
            >
              <FaEye className="text-blue-500" />
              View Product
            </button>

            <button
              onClick={() => {
                onEdit();
                setShowMenu(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50"
            >
              <FaEdit className="text-green-500" />
              Edit Product
            </button>

            <button
              onClick={() => {
                onDuplicate();
                setShowMenu(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50"
            >
              <FaCopy className="text-purple-500" />
              Duplicate
            </button>

            <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50">
              <FaBan className="text-orange-500" />
              Disable Product
            </button>

            <button
              onClick={() => {
                onDelete();
                setShowMenu(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50"
            >
              <FaTrash />
              Delete Product
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
