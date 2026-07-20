import { useState } from "react";

export default function CreateTicket() {
  const [form, setForm] = useState({
    subject: "",
    priority: "Medium",
    message: "",
  });

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Create Support Ticket</h2>

      <div className="space-y-5">
        <input
          placeholder="Ticket Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full border rounded-xl p-3"
        />

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="w-full border rounded-xl p-3"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <textarea
          rows={6}
          placeholder="Describe your issue..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border rounded-xl p-3"
        />

        <button className="bg-indigo-600 text-white rounded-xl px-6 py-3">
          Submit Ticket
        </button>
      </div>
    </div>
  );
}
