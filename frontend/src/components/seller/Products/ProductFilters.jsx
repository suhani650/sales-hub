import { useState } from "react";
import ProductStats from "../../../components/seller/Products/ProductStats";
import ProductToolbar from "../../../components/seller/Products/ProductToolbar";
import ProductFilters from "../../../components/seller/Products/ProductFilters";
import ProductTable from "../../../components/seller/Products/ProductTable";

export default function ProductDashboard() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("table");

  return (
    <div className="space-y-6">
      <ProductStats />

      <ProductToolbar
        search={search}
        onSearch={setSearch}
        view={view}
        onViewChange={setView}
        onAddProduct={() => console.log("Add Product")}
        onImport={() => console.log("Import")}
        onExport={() => console.log("Export")}
        onRefresh={() => console.log("Refresh")}
        onBulkDelete={() => console.log("Bulk Delete")}
        onBulkStatus={() => console.log("Bulk Status")}
      />

      <ProductFilters />

      <ProductTable />
    </div>
  );
}
