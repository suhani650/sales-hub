import {
  HiOutlineDocumentArrowDown,
  HiOutlineDocumentText,
} from "react-icons/hi2";

export default function ExportReports() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Export Reports</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <button className="border rounded-xl p-5 flex items-center gap-3">
          <HiOutlineDocumentArrowDown size={24} />
          Export PDF
        </button>

        <button className="border rounded-xl p-5 flex items-center gap-3">
          <HiOutlineDocumentText size={24} />
          Export Excel
        </button>
      </div>
    </div>
  );
}
