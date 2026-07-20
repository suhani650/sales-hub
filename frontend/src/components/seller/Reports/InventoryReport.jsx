const inventory = [
  {
    product: "Wireless Mouse",
    stock: 152,
    sold: 842,
  },
  {
    product: "Gaming Keyboard",
    stock: 88,
    sold: 645,
  },
  {
    product: "Bluetooth Speaker",
    stock: 124,
    sold: 520,
  },
];

export default function InventoryReport() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Inventory Report</h2>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-3">Product</th>

            <th>Stock</th>

            <th>Sold</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item) => (
            <tr key={item.product} className="border-t">
              <td className="p-3">{item.product}</td>

              <td>{item.stock}</td>

              <td>{item.sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
