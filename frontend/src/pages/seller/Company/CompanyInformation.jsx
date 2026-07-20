import { useState } from "react";

export default function CompanyInformation() {
  const [formData, setFormData] = useState({
    companyName: "ABC Electronics Pvt Ltd",
    ownerName: "Rahul Sharma",
    email: "vendor@example.com",
    phone: "+91 9876543210",
    businessCategory: "Electronics",
    website: "https://abcelectronics.com",
    establishedYear: "2022",
    employees: "50",
    description: "Leading electronics manufacturer and supplier across India.",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // API Integration
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b p-6">
        <h2 className="text-2xl font-semibold">Company Information</h2>

        <p className="text-gray-500 mt-2">Update your company details.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Company Name</label>

            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Owner Name</label>

            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Phone Number</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Business Category</label>

            <select
              name="businessCategory"
              value={formData.businessCategory}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Furniture</option>
              <option>Food</option>
              <option>Healthcare</option>
              <option>Sports</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Website</label>

            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Established Year</label>

            <input
              type="number"
              name="establishedYear"
              value={formData.establishedYear}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Number of Employees
            </label>

            <input
              type="number"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Company Description</label>

          <textarea
            rows={6}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Save Information
          </button>
        </div>
      </form>
    </div>
  );
}
