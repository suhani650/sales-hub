import { useState, useMemo, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineExclamationTriangle,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineMagnifyingGlass,
  HiOutlinePaperAirplane,
  HiOutlineArrowPath,
  HiOutlineTrash,
  HiOutlineFaceSmile,
  HiOutlinePaperClip,
  HiOutlineChevronDown,
} from "react-icons/hi2";

import {
  useGetTicketsQuery,
  useGetTicketQuery,
  useGetTicketAnalyticsQuery,
  useUpdateTicketStatusMutation,
  useDeleteTicketMutation,
  useUploadFileMutation,
} from "../../../services/vendorApi";

// This page is wired to the real Support Ticket API (backend/src/routes/seller/support.routes.js).
// There is currently no per-ticket "reply/message thread" model in the backend (SupportTicket only
// has subject + description, no messages table), so replies typed here are kept in local component
// state only (clearly marked below) and are not persisted. Everything else — the ticket list, stats,
// status changes, deleting a ticket, and file attachments — hits real backend endpoints.

const STATUS_FLOW = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

const STATUS_STYLES = {
  OPEN: "bg-orange-500/20 text-orange-400",
  IN_PROGRESS: "bg-blue-500/20 text-blue-400",
  RESOLVED: "bg-green-500/20 text-green-400",
  CLOSED: "bg-slate-500/20 text-slate-400",
};

const PRIORITY_DOT = {
  HIGH: "bg-red-500",
  MEDIUM: "bg-orange-500",
  LOW: "bg-green-500",
};

const EMOJIS = ["🙂", "👍", "🙏", "📦", "⏳", "✅"];

function timeAgo(dateString) {
  if (!dateString) return "";
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function ChatDashboard() {
  const {
    data: ticketsResponse,
    isLoading: ticketsLoading,
    isError: ticketsIsError,
    refetch: refetchTickets,
  } = useGetTicketsQuery();

  const { data: analyticsResponse } = useGetTicketAnalyticsQuery();

  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [draft, setDraft] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [localReplies, setLocalReplies] = useState({}); // session-only replies per ticket id

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [updateStatus, { isLoading: statusUpdating }] =
    useUpdateTicketStatusMutation();
  const [deleteTicket, { isLoading: deleting }] = useDeleteTicketMutation();
  const [uploadFile, { isLoading: uploading }] = useUploadFileMutation();

  const tickets = ticketsResponse?.data || [];
  const analytics = analyticsResponse?.data;

  const highPriorityCount = useMemo(
    () => tickets.filter((t) => t.priority === "HIGH").length,
    [tickets],
  );

  useEffect(() => {
    if (!selectedId && tickets.length > 0) {
      setSelectedId(tickets[0].id);
    }
  }, [tickets, selectedId]);

  const {
    data: ticketDetailResponse,
    isFetching: detailLoading,
    isError: detailIsError,
    refetch: refetchDetail,
  } = useGetTicketQuery(selectedId, { skip: !selectedId });

  const selectedTicket =
    ticketDetailResponse?.data ||
    tickets.find((t) => t.id === selectedId) ||
    null;

  const filteredTickets = tickets.filter(
    (t) =>
      t.subject?.toLowerCase().includes(search.toLowerCase()) ||
      t.ticketNumber?.toLowerCase().includes(search.toLowerCase()),
  );

  const thread = selectedTicket
    ? [
        {
          id: `desc-${selectedTicket.id}`,
          sender: "customer",
          text: selectedTicket.description,
          time: timeAgo(selectedTicket.createdAt),
        },
        ...(localReplies[selectedTicket.id] || []),
      ]
    : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread.length, selectedId]);

  async function handleStatusChange(newStatus) {
    if (!selectedTicket) return;
    try {
      await updateStatus({ id: selectedTicket.id, status: newStatus }).unwrap();
      toast.success(`Ticket marked ${newStatus.replace("_", " ")}`);
    } catch {
      toast.error("Status update failed");
    }
    setShowStatusMenu(false);
  }

  async function handleDelete() {
    if (!selectedTicket) return;
    if (
      !window.confirm(
        `Delete ticket ${selectedTicket.ticketNumber}? This can't be undone.`,
      )
    )
      return;
    try {
      await deleteTicket(selectedTicket.id).unwrap();
      toast.success("Ticket deleted");
      setSelectedId(null);
    } catch {
      toast.error("Delete failed");
    }
  }

  function appendLocalMessage(text) {
    if (!selectedTicket) return;
    setLocalReplies((prev) => ({
      ...prev,
      [selectedTicket.id]: [
        ...(prev[selectedTicket.id] || []),
        { id: `local-${Date.now()}`, sender: "seller", text, time: "just now" },
      ],
    }));
  }

  async function handleAttachClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !selectedTicket) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadFile(formData).unwrap();
      appendLocalMessage(`📎 Attachment uploaded: ${res.url}`);
      toast.success("File uploaded");
    } catch {
      toast.error("Upload failed");
    }
  }

  function handleSend() {
    const text = draft.trim();
    if (!text || !selectedTicket) return;
    appendLocalMessage(text);
    setDraft("");
  }

  function handleDraftKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="space-y-6">
      {/* ================= Header ================= */}

      <div className="rounded-[30px] bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 p-8 text-white">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <span className="px-4 py-2 rounded-full bg-white/20">
              Customer Support Center
            </span>

            <h1 className="text-5xl font-bold mt-5">Chat Dashboard</h1>

            <p className="text-cyan-100 mt-4 max-w-2xl">
              Manage customer support tickets, priorities, and status updates
              from one place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={<HiOutlineChatBubbleLeftRight />}
              title="Total Tickets"
              value={analytics ? analytics.total : "…"}
              color="cyan"
            />

            <StatCard
              icon={<HiOutlineExclamationTriangle />}
              title="High Priority"
              value={ticketsLoading ? "…" : highPriorityCount}
              color="green"
            />

            <StatCard
              icon={<HiOutlineClock />}
              title="Open"
              value={analytics ? analytics.open : "…"}
              color="orange"
            />

            <StatCard
              icon={<HiOutlineCheckCircle />}
              title="Closed"
              value={analytics ? analytics.closed : "…"}
              color="purple"
            />
          </div>
        </div>
      </div>

      {/* ================= Main Chat ================= */}

      <div className="grid xl:grid-cols-12 gap-6">
        {/* Sidebar */}

        <div className="xl:col-span-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="relative">
              <HiOutlineMagnifyingGlass className="absolute left-4 top-4 text-slate-500 text-xl" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ticket or subject..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          <div className="max-h-[700px] overflow-y-auto">
            {ticketsLoading && (
              <div className="p-6 space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse flex gap-4">
                    <div className="w-14 h-14 rounded-full bg-slate-700" />
                    <div className="flex-1 space-y-2 py-2">
                      <div className="h-3 bg-slate-700 rounded w-2/3" />
                      <div className="h-3 bg-slate-700 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!ticketsLoading && ticketsIsError && (
              <div className="p-6 text-center space-y-3">
                <p className="text-red-400 text-sm">Couldn't load tickets.</p>
                <button
                  onClick={refetchTickets}
                  className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
                >
                  <HiOutlineArrowPath /> Retry
                </button>
              </div>
            )}

            {!ticketsLoading &&
              !ticketsIsError &&
              filteredTickets.length === 0 && (
                <p className="p-6 text-slate-500 text-sm text-center">
                  No tickets found.
                </p>
              )}

            {!ticketsLoading &&
              !ticketsIsError &&
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedId(ticket.id)}
                  className={`flex items-center gap-4 p-5 border-b border-white/5 hover:bg-slate-800 duration-300 cursor-pointer ${
                    ticket.id === selectedId ? "bg-slate-800" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {ticket.ticketNumber?.slice(-4) || "TKT"}
                    </div>

                    <span
                      className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#1E293B] ${
                        PRIORITY_DOT[ticket.priority] || "bg-slate-500"
                      }`}
                      title={`${ticket.priority} priority`}
                    ></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h4 className="text-white font-semibold truncate">
                        {ticket.subject}
                      </h4>

                      <span className="text-xs text-slate-500 shrink-0 ml-2">
                        {timeAgo(ticket.createdAt)}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm mt-1 truncate">
                      {ticket.description}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-1 rounded-full font-medium shrink-0 ${
                      STATUS_STYLES[ticket.status] ||
                      "bg-slate-500/20 text-slate-400"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Chat Window */}

        <div className="xl:col-span-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden flex flex-col">
          {!selectedTicket ? (
            <div className="flex-1 flex items-center justify-center text-slate-500 p-10 text-center">
              {ticketsLoading
                ? "Loading tickets..."
                : "Select a ticket to view the conversation."}
            </div>
          ) : (
            <>
              {/* Header */}

              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {selectedTicket.ticketNumber?.slice(-4) || "TKT"}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-white text-xl font-bold truncate">
                      {selectedTicket.subject}
                    </h3>

                    <p className="text-slate-400 text-sm">
                      {selectedTicket.ticketNumber} ·{" "}
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-1 ${
                          PRIORITY_DOT[selectedTicket.priority] ||
                          "bg-slate-500"
                        }`}
                      ></span>
                      {selectedTicket.priority} priority
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => refetchDetail()}
                    disabled={detailLoading}
                    title="Refresh"
                    className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white disabled:opacity-50"
                  >
                    <HiOutlineArrowPath
                      className={detailLoading ? "animate-spin" : ""}
                    />
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setShowStatusMenu((s) => !s)}
                      disabled={statusUpdating}
                      className={`h-12 px-4 rounded-xl flex items-center gap-2 text-sm font-medium disabled:opacity-50 ${
                        STATUS_STYLES[selectedTicket.status] ||
                        "bg-slate-800 text-white"
                      }`}
                    >
                      {selectedTicket.status} <HiOutlineChevronDown />
                    </button>

                    {showStatusMenu && (
                      <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden z-10 shadow-xl">
                        {STATUS_FLOW.map((s) => (
                          <button
                            key={s}
                            onClick={() => handleStatusChange(s)}
                            className="w-full text-left px-4 py-3 text-sm text-slate-200 hover:bg-slate-700"
                          >
                            Mark {s.replace("_", " ")}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    title="Delete ticket"
                    className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-white disabled:opacity-50"
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
              </div>

              {/* Messages */}

              <div className="p-6 space-y-5 h-[420px] overflow-y-auto">
                {detailIsError && (
                  <div className="text-center space-y-3">
                    <p className="text-red-400 text-sm">
                      Couldn't load ticket details.
                    </p>
                    <button
                      onClick={() => refetchDetail()}
                      className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
                    >
                      <HiOutlineArrowPath /> Retry
                    </button>
                  </div>
                )}

                {!detailIsError &&
                  thread.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "seller"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-md px-5 py-4 rounded-2xl ${
                          msg.sender === "seller"
                            ? "bg-cyan-500 text-white"
                            : "bg-slate-800 text-slate-200"
                        }`}
                      >
                        <p className="break-words">{msg.text}</p>

                        <span className="text-xs opacity-70 mt-2 block">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}

                <div ref={messagesEndRef} />
              </div>

              {/* Reply notice */}
              <p className="px-6 text-xs text-slate-500 -mt-2 mb-2">
                Replies below are added to this view for your current session
                only — the backend doesn't yet store a message thread for
                tickets.
              </p>

              {/* Input */}

              <div className="border-t border-white/10 p-5">
                <div className="flex gap-3 relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="relative">
                    <button
                      onClick={() => setShowEmoji((s) => !s)}
                      className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 flex justify-center items-center hover:bg-slate-700"
                    >
                      <HiOutlineFaceSmile />
                    </button>

                    {showEmoji && (
                      <div className="absolute bottom-14 left-0 bg-slate-800 border border-slate-700 rounded-xl p-3 flex gap-2 z-10 shadow-xl">
                        {EMOJIS.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => {
                              setDraft((d) => d + emoji);
                              setShowEmoji(false);
                            }}
                            className="text-xl hover:scale-125 duration-150"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleAttachClick}
                    disabled={uploading}
                    className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 flex justify-center items-center hover:bg-slate-700 disabled:opacity-50"
                  >
                    <HiOutlinePaperClip
                      className={uploading ? "animate-pulse" : ""}
                    />
                  </button>

                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleDraftKeyDown}
                    placeholder="Type your reply..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-5 text-white placeholder-slate-500 outline-none focus:border-cyan-500"
                  />

                  <button
                    onClick={handleSend}
                    disabled={!draft.trim()}
                    className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex justify-center items-center hover:scale-105 duration-300 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <HiOutlinePaperAirplane size={22} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  const colors = {
    cyan: "from-cyan-500 to-blue-600",
    green: "from-green-500 to-emerald-600",
    orange: "from-orange-500 to-red-500",
    purple: "from-purple-500 to-pink-600",
  };

  return (
    <div className="bg-white/10 rounded-2xl p-5 backdrop-blur">
      <div
        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${colors[color]} flex items-center justify-center text-2xl`}
      >
        {icon}
      </div>

      <p className="mt-4 text-cyan-100">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
