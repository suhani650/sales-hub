import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineShoppingBag,
  HiOutlineCube,
  HiOutlineExclamationTriangle,
  HiOutlineCurrencyRupee,
  HiOutlinePlus,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";

const stats = [
  {
    title: "Total Products",
    value: 245,
    color: "primary",
    icon: HiOutlineShoppingBag,
  },
  {
    title: "In Stock",
    value: 210,
    color: "success",
    icon: HiOutlineCube,
  },
  {
    title: "Low Stock",
    value: 18,
    color: "warning",
    icon: HiOutlineExclamationTriangle,
  },
  {
    title: "Revenue",
    value: "₹1,25,600",
    color: "info",
    icon: HiOutlineCurrencyRupee,
  },
];

const products = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    stock: 35,
    price: "₹2,499",
    status: "Active",
  },
  {
    id: "PRD-002",
    name: "Gaming Mouse",
    category: "Accessories",
    stock: 12,
    price: "₹999",
    status: "Active",
  },
  {
    id: "PRD-003",
    name: "Bluetooth Speaker",
    category: "Electronics",
    stock: 4,
    price: "₹3,299",
    status: "Low Stock",
  },
  {
    id: "PRD-004",
    name: "Laptop Stand",
    category: "Office",
    stock: 0,
    price: "₹799",
    status: "Out of Stock",
  },
];

const badgeClass = (status) => {
  switch (status) {
    case "Active":
      return "bg-success";
    case "Low Stock":
      return "bg-warning text-dark";
    case "Out of Stock":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};

const ProductDashboard = () => {
  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Product Dashboard</h2>

        <Link to="/seller/products/add" className="btn btn-primary">
          <HiOutlinePlus className="me-2" />
          Add Product
        </Link>
      </div>

      <div className="row g-4 mb-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div className="col-lg-3 col-md-6" key={item.title}>
              <div className="card shadow-sm border-0">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">{item.title}</small>
                    <h3 className="fw-bold mt-2">{item.value}</h3>
                  </div>

                  <div
                    className={`rounded-circle bg-${item.color} text-white d-flex align-items-center justify-content-center`}
                    style={{
                      width: 60,
                      height: 60,
                    }}
                  >
                    <Icon size={28} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <HiOutlineClipboardDocumentList className="me-2" />
            Product List
          </h5>

          <input
            type="text"
            className="form-control"
            placeholder="Search Product..."
            style={{ width: 250 }}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Status</th>
                <th width="180">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>

                  <td>{product.name}</td>

                  <td>{product.category}</td>

                  <td>{product.stock}</td>

                  <td>{product.price}</td>

                  <td>
                    <span className={`badge ${badgeClass(product.status)}`}>
                      {product.status}
                    </span>
                  </td>

                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">
                      Edit
                    </button>

                    <button className="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
