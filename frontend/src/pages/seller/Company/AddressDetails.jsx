import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaWarehouse,
  FaTruck,
  FaGlobeAsia,
  FaCheckCircle,
} from "react-icons/fa";

export default function AddressDetails() {
  const [address, setAddress] = useState({
    businessAddress: "",
    warehouseAddress: "",
    pickupAddress: "",
    billingAddress: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
    landmark: "",
    latitude: "",
    longitude: "",
    isDefaultPickup: true,
    verified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setAddress({
      ...address,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(address);

    // TODO:
    // PUT /api/vendor/company/address
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b p-6 flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Address Details</h2>

          <p className="text-gray-500 mt-2">
            Manage your business and warehouse addresses.
          </p>
        </div>

        {address.verified ? (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
            <FaCheckCircle />
            Verified
          </div>
        ) : (
          <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
            Verification Pending
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Business */}

        <div>
          <label className="font-medium flex items-center gap-2 mb-2">
            <FaMapMarkerAlt />
            Business Address
          </label>

          <textarea
            rows={3}
            name="businessAddress"
            value={address.businessAddress}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Warehouse */}

        <div>
          <label className="font-medium flex items-center gap-2 mb-2">
            <FaWarehouse />
            Warehouse Address
          </label>

          <textarea
            rows={3}
            name="warehouseAddress"
            value={address.warehouseAddress}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Pickup */}

        <div>
          <label className="font-medium flex items-center gap-2 mb-2">
            <FaTruck />
            Pickup Address
          </label>

          <textarea
            rows={3}
            name="pickupAddress"
            value={address.pickupAddress}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Billing */}

        <div>
          <label className="font-medium mb-2 block">Billing Address</label>

          <textarea
            rows={3}
            name="billingAddress"
            value={address.billingAddress}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Country State City */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="font-medium mb-2 block">Country</label>

            <input
              name="country"
              value={address.country}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-medium mb-2 block">State</label>

            <input
              name="state"
              value={address.state}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-medium mb-2 block">City</label>

            <input
              name="city"
              value={address.city}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-medium mb-2 block">PIN Code</label>

            <input
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>
        </div>

        {/* Landmark */}

        <div>
          <label className="font-medium mb-2 block">Landmark</label>

          <input
            name="landmark"
            value={address.landmark}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* GPS */}

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="font-medium mb-2 block">Latitude</label>

            <input
              name="latitude"
              value={address.latitude}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-medium mb-2 block">Longitude</label>

            <input
              name="longitude"
              value={address.longitude}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>
        </div>

        {/* Map Placeholder */}

        <div>
          <label className="font-medium mb-3 flex items-center gap-2">
            <FaGlobeAsia />
            Google Maps Location
          </label>

          <div className="h-64 rounded-xl border-2 border-dashed flex items-center justify-center text-gray-500">
            Google Maps Component (Coming in API Integration)
          </div>
        </div>

        {/* Default Pickup */}

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isDefaultPickup"
            checked={address.isDefaultPickup}
            onChange={handleChange}
          />

          <label>Use as Default Pickup Address</label>
        </div>

        {/* Save */}

        <div className="flex justify-end border-t pt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
}
