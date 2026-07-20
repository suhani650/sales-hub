import { useState } from "react";

export default function TicketReply() {
  const [reply, setReply] = useState("");

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Reply</h2>

      <textarea
        rows={5}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write your reply..."
        className="w-full border rounded-xl p-4"
      />

      <button className="mt-5 bg-green-600 text-white rounded-xl px-6 py-3">
        Send Reply
      </button>
    </div>
  );
}
