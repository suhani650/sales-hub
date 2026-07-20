import ProductStats from "../../../components/seller/Products/ProductStats";
import ProductToolbar from "../../../components/seller/Products/ProductToolbar";
import ProductTable from "../../../components/seller/Products/ProductTable";
import BulkActionBar from "../../../components/seller/Products/BulkActionBar";
import ProductPagination from "../../../components/seller/Products/ProductPagination";
import ProductGrid from "../../../components/seller/Products/ProductGrid";

export default function ProductManagement() {
  const products = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      name: "Nike Air Max",
      sku: "SKU1001",
      category: "Shoes",
      brand: "Nike",
      stock: 45,
      price: 4999,
      status: "Approved",
      rating: 4.8,
      sales: 240,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      name: "Apple Watch",
      sku: "SKU1002",
      category: "Electronics",
      brand: "Apple",
      stock: 15,
      price: 28999,
      status: "Pending",
      rating: 4.9,
      sales: 75,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      name: "iPhone 15",
      sku: "SKU1003",
      category: "Mobiles",
      brand: "Apple",
      stock: 8,
      price: 79999,
      status: "Approved",
      rating: 5,
      sales: 120,
    },
  ];

  return (
    <div className="space-y-6">
      <ProductStats />

      <ProductToolbar view={view} onViewChange={setView} />

      <BulkActionBar
        selectedCount={2}
        onApprove={() => console.log("Approve")}
        onReject={() => console.log("Reject")}
        onDelete={() => console.log("Delete")}
        onArchive={() => console.log("Archive")}
        onPublish={() => console.log("Publish")}
        onUnpublish={() => console.log("Unpublish")}
        onExport={() => console.log("Export")}
        onFeature={() => console.log("Feature")}
        onDiscount={() => console.log("Discount")}
        onStockUpdate={() => console.log("Stock Update")}
      />

      {view === "table" ? (
        <ProductTable
          products={products}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      ) : (
        <ProductGrid
          products={products}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      )}

      <ProductPagination currentPage={1} totalPages={10} />
    </div>
  );
}
