import { useState } from "react";
import ProductRow from "./ProductRow";
import ProductEmpty from "./ProductEmpty";
import ProductPagination from "./ProductPagination";

export default function ProductTable({
  products = [],
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onDuplicate = () => {},
}) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(products.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  if (!products.length) {
    return (
      <ProductEmpty
        onRefresh={() => console.log("Refresh")}
        onImport={() => console.log("Import")}
        onClearFilters={() => console.log("Clear")}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Product List</h2>

          <p className="text-sm text-gray-500 mt-1">
            {products.length} Products Found
          </p>
        </div>

        <div className="text-sm text-gray-500">
          Selected :
          <span className="font-semibold text-blue-600 ml-1">
            {selectedProducts.length}
          </span>
        </div>
      </div>

      {/* Desktop */}

      <div className="overflow-x-auto hidden lg:block">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={
                    products.length > 0 &&
                    selectedProducts.length === products.length
                  }
                  onChange={handleSelectAll}
                />
              </th>

              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">SKU</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Brand</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Sales</th>
              <th className="text-left p-4">Rating</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                checked={selectedProducts.includes(product.id)}
                onSelect={() => handleSelect(product.id)}
                onView={() => onView(product)}
                onEdit={() => onEdit(product)}
                onDelete={() => onDelete(product)}
                onDuplicate={() => onDuplicate(product)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}

      <div className="lg:hidden divide-y">
        {products.map((product) => (
          <div key={product.id} className="p-5">
            <div className="flex gap-4">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleSelect(product.id)}
              />

              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover border"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{product.name}</h3>

                <p className="text-sm text-gray-500">{product.brand}</p>

                <p className="text-xs text-gray-500 mt-1">
                  SKU : {product.sku}
                </p>

                <p className="text-blue-600 font-bold mt-2">
                  ₹{Number(product.price).toLocaleString()}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm">⭐ {product.rating}</span>

                  <span className="text-sm text-gray-500">
                    Stock : {product.stock}
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => onView(product)}
                    className="px-3 py-1 rounded bg-blue-100 text-blue-600 text-sm hover:bg-blue-200"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onEdit(product)}
                    className="px-3 py-1 rounded bg-green-100 text-green-600 text-sm hover:bg-green-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(product)}
                    className="px-3 py-1 rounded bg-red-100 text-red-600 text-sm hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="border-t p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <div>Showing {products.length} Products</div>

        <div>Selected {selectedProducts.length}</div>
      </div>

      {/* Pagination */}

      <ProductPagination
        totalItems={products.length}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}
