import { Link } from "react-router-dom";
import { FaStar, FaArrowUp } from "react-icons/fa";

const products = [
  {
    id: 1,
    image: "https://via.placeholder.com/60",
    name: "Smart Watch",
    sales: 245,
    revenue: "₹7,35,000",
    stock: 65,
    rating: 4.8,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/60",
    name: "Wireless Earbuds",
    sales: 198,
    revenue: "₹5,82,000",
    stock: 32,
    rating: 4.7,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/60",
    name: "Gaming Mouse",
    sales: 165,
    revenue: "₹3,95,000",
    stock: 80,
    rating: 4.6,
  },
  {
    id: 4,
    image: "https://via.placeholder.com/60",
    name: "Laptop Bag",
    sales: 140,
    revenue: "₹2,85,000",
    stock: 24,
    rating: 4.5,
  },
];

export default function TopProducts() {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="flex justify-between items-center p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold">Top Selling Products</h2>

          <p className="text-gray-500 text-sm">Best performing products</p>
        </div>

        <Link to="/seller/products" className="text-blue-600 hover:underline">
          View All
        </Link>
      </div>

      <div className="p-5 space-y-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 hover:shadow-md transition"
          >
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{product.name}</h3>

                <div className="flex items-center gap-2 mt-1 text-sm">
                  <FaStar className="text-yellow-500" />

                  {product.rating}
                </div>

                <div className="mt-2 flex justify-between text-sm">
                  <span>Sales</span>

                  <span className="font-semibold">{product.sales}</span>
                </div>

                <div className="w-full h-2 rounded bg-gray-200 mt-2">
                  <div
                    className="h-2 rounded bg-green-500"
                    style={{
                      width: `${product.stock}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between mt-2 text-xs">
                  <span>Stock</span>

                  <span>{product.stock}%</span>
                </div>

                <div className="flex justify-between mt-3">
                  <span className="font-bold text-green-600">
                    {product.revenue}
                  </span>

                  <span className="flex items-center gap-1 text-green-600">
                    <FaArrowUp />
                    Good
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
