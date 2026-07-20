import {
  FaBoxes,
  FaExclamationTriangle,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

const inventory = [
  {
    title: "Total Stock",
    value: 2540,
    color: "bg-blue-500",
    icon: <FaBoxes />,
  },
  {
    title: "Healthy Stock",
    value: 2280,
    color: "bg-green-500",
    icon: <FaCheckCircle />,
  },
  {
    title: "Low Stock",
    value: 180,
    color: "bg-yellow-500",
    icon: <FaExclamationTriangle />,
  },
  {
    title: "Out Of Stock",
    value: 80,
    color: "bg-red-500",
    icon: <FaTimesCircle />,
  },
];

const lowStockProducts = [
  {
    id: 1,
    name: "Smart Watch",
    stock: 5,
  },
  {
    id: 2,
    name: "Laptop Bag",
    stock: 2,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    stock: 0,
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    stock: 8,
  },
];

export default function InventorySummary() {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">Inventory Summary</h2>

        <p className="text-gray-500 text-sm mt-1">Current stock overview</p>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5">
        {inventory.map((item) => (
          <div key={item.title} className="border rounded-xl p-4">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${item.color}`}
            >
              {item.icon}
            </div>

            <p className="mt-4 text-gray-500 text-sm">{item.title}</p>

            <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="border-t p-5">
        <h3 className="font-semibold mb-4">Low Stock Products</h3>

        <div className="space-y-4">
          {lowStockProducts.map((product) => (
            <div key={product.id} className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{product.name}</h4>

                <p className="text-sm text-gray-500">Remaining Stock</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  product.stock === 0
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {product.stock}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
