import {
  HiOutlineTruck,
  HiOutlineXCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

export default function BulkOrderActions() {
  return (
    <div className="bg-white rounded-2xl border p-5 flex flex-wrap gap-4">
      <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center">
        <HiOutlineTruck />
        Mark Shipped
      </button>

      <button className="bg-green-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center">
        <HiOutlineCheckCircle />
        Mark Delivered
      </button>

      <button className="bg-red-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center">
        <HiOutlineXCircle />
        Cancel Orders
      </button>
    </div>
  );
}
