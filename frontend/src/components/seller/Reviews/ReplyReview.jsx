import { useState } from "react";

export default function ReplyReview() {
  const [reply, setReply] = useState("");

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold">Seller Reply</h2>

      <textarea
        rows={5}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write your reply..."
        className="w-full border rounded-xl mt-5 p-4"
      />

      <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl mt-5">
        Publish Reply
      </button>
    </div>
  );
}
