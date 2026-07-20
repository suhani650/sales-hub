import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
  HiOutlineMegaphone,
  HiOutlineClock,
  HiOutlineFunnel,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineEye,
  HiOutlineArrowPath,
  HiOutlineShoppingBag,
  HiOutlineCreditCard,
  HiOutlineStar,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

import {
  useGetNotificationsQuery,
  useGetNotificationStatsQuery,
  useMarkNotificationReadMutation,
  useMarkNotificationUnreadMutation,
  useMarkAllNotificationsReadMutation,
  useDeleteNotificationMutation,
} from "../../../services/notificationApi";
import { getSocket, joinUserRoom } from "../../../lib/socket";
import { notificationApi } from "../../../services/notificationApi";

dayjs.extend(relativeTime);

const FILTERS = [
  { key: "ALL", label: "All" },
  { key: "ORDER", label: "Orders" },
  { key: "PAYMENT", label: "Payments" },
  { key: "INVENTORY", label: "Inventory" },
  { key: "PROMOTION", label: "Promotions" },
];

const TYPE_META = {
  ORDER: { icon: <HiOutlineShoppingBag />, color: "from-cyan-500 to-blue-600" },
  PAYMENT: {
    icon: <HiOutlineCreditCard />,
    color: "from-green-500 to-emerald-600",
  },
  INVENTORY: {
    icon: <HiOutlineExclamationTriangle />,
    color: "from-orange-500 to-red-500",
  },
  PROMOTION: {
    icon: <HiOutlineMegaphone />,
    color: "from-purple-500 to-pink-600",
  },
  REVIEW: { icon: <HiOutlineStar />, color: "from-yellow-500 to-amber-600" },
  SUPPORT: {
    icon: <HiOutlineChatBubbleLeftRight />,
    color: "from-indigo-500 to-violet-600",
  },
  SUCCESS: {
    icon: <HiOutlineCheckCircle />,
    color: "from-green-500 to-emerald-600",
  },
  WARNING: {
    icon: <HiOutlineExclamationTriangle />,
    color: "from-orange-500 to-red-500",
  },
  INFO: {
    icon: <HiOutlineInformationCircle />,
    color: "from-slate-500 to-slate-700",
  },
};

function getMeta(type) {
  return TYPE_META[type] || TYPE_META.INFO;
}

export default function NotificationsDashboard() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  const queryParams = useMemo(
    () => ({
      type: activeFilter === "ALL" ? undefined : activeFilter,
      unread: unreadOnly ? "true" : undefined,
      limit: 50,
    }),
    [activeFilter, unreadOnly],
  );

  const {
    data: notifData,
    isLoading: notifLoading,
    isFetching: notifFetching,
    error: notifError,
    refetch: refetchNotifications,
  } = useGetNotificationsQuery(queryParams);

  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = useGetNotificationStatsQuery();

  const [markRead] = useMarkNotificationReadMutation();
  const [markUnread] = useMarkNotificationUnreadMutation();
  const [markAllRead, { isLoading: markingAll }] =
    useMarkAllNotificationsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notifications = notifData?.items ?? [];

  // Live updates: join the user's socket room and refresh data the moment a
  // new notification is created anywhere in the backend for this user.
  useEffect(() => {
    if (!user?.id) return;

    const socket = getSocket();
    joinUserRoom(user.id);

    const handleConnect = () => {
      setSocketConnected(true);
      joinUserRoom(user.id);
    };
    const handleDisconnect = () => setSocketConnected(false);

    const handleNewNotification = () => {
      // A fresh row was inserted server-side — invalidate the cached list
      // and stats so this dashboard reflects it immediately.
      dispatch(
        notificationApi.util.invalidateTags([
          { type: "Notifications", id: "LIST" },
          { type: "Notifications", id: "STATS" },
        ]),
      );
    };

    setSocketConnected(socket.connected);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("notification:new", handleNewNotification);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("notification:new", handleNewNotification);
    };
  }, [user?.id, dispatch]);

  const handleRefresh = () => {
    refetchNotifications();
    refetchStats();
  };

  const handleMarkAllRead = () => {
    markAllRead(activeFilter === "ALL" ? undefined : activeFilter);
  };

  const handleToggleRead = (notification) => {
    if (notification.isRead) {
      markUnread(notification.id);
    } else {
      markRead(notification.id);
    }
  };

  const handleDelete = (id) => {
    if (pendingDeleteId === id) {
      deleteNotification(id);
      setPendingDeleteId(null);
    } else {
      setPendingDeleteId(id);
      setTimeout(() => {
        setPendingDeleteId((current) => (current === id ? null : current));
      }, 4000);
    }
  };

  const statCards = [
    {
      title: "Total Notifications",
      value: statsLoading ? "—" : (stats?.total ?? 0),
      icon: <HiOutlineBell />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Unread",
      value: statsLoading ? "—" : (stats?.unread ?? 0),
      icon: <HiOutlineInformationCircle />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Inventory Alerts",
      value: statsLoading ? "—" : (stats?.byType?.INVENTORY ?? 0),
      icon: <HiOutlineExclamationTriangle />,
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "Read",
      value: statsLoading ? "—" : (stats?.read ?? 0),
      icon: <HiOutlineCheckCircle />,
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HERO ================= */}

      <div className="rounded-[32px] overflow-hidden bg-gradient-to-r from-[#071028] via-[#111936] to-[#1E1B4B] p-10 border border-white/10">
        <div className="flex flex-col xl:flex-row justify-between gap-8">
          <div>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 inline-flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  socketConnected
                    ? "bg-emerald-400 animate-pulse"
                    : "bg-slate-500"
                }`}
              />
              Seller Notification Center{" "}
              {socketConnected ? "· Live" : "· Connecting…"}
            </span>

            <h1 className="text-5xl font-bold text-white mt-5">
              Notifications Dashboard
            </h1>

            <p className="text-slate-300 mt-5 max-w-2xl leading-8">
              Track all order updates, payments, offers, customer activities,
              inventory alerts and important business notifications in one
              place.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleMarkAllRead}
              disabled={markingAll || !stats?.unread}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-all duration-300"
            >
              {markingAll ? "Marking..." : "Mark All Read"}
            </button>

            <button
              onClick={handleRefresh}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <HiOutlineArrowPath
                className={notifFetching ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {statCards.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 hover:scale-[1.02] transition-all duration-300"
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-3xl text-white`}
            >
              {item.icon}
            </div>

            <p className="text-slate-400 mt-5">{item.title}</p>

            <h2 className="text-4xl text-white font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* ================= FILTER ================= */}

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
        <div className="flex flex-wrap items-center gap-4">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-5 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 ${
                activeFilter === f.key
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800 hover:bg-slate-700 text-white"
              }`}
            >
              {f.key === "ALL" && <HiOutlineFunnel />}
              {f.label}
            </button>
          ))}

          <button
            onClick={() => setUnreadOnly((v) => !v)}
            className={`ml-auto px-5 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 ${
              unreadOnly
                ? "bg-orange-500 text-white"
                : "bg-slate-800 hover:bg-slate-700 text-white"
            }`}
          >
            Unread only
          </button>
        </div>
      </div>

      {/* ================= NOTIFICATIONS ================= */}

      {notifLoading ? (
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 animate-pulse"
            >
              <div className="flex gap-5">
                <div className="w-16 h-16 rounded-2xl bg-slate-800" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-1/3 bg-slate-800 rounded" />
                  <div className="h-3 w-2/3 bg-slate-800 rounded" />
                  <div className="h-3 w-1/4 bg-slate-800 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : notifError ? (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-10 text-center text-red-300">
          Couldn't load notifications. Check that the backend API is running.
          <div>
            <button
              onClick={handleRefresh}
              className="mt-4 px-5 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 hover:bg-red-500/30"
            >
              Try again
            </button>
          </div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-16 text-center">
          <HiOutlineBell className="text-5xl text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">
            {unreadOnly
              ? "No unread notifications in this category."
              : "No notifications yet in this category."}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {notifications.map((item) => {
            const meta = getMeta(item.type);
            return (
              <div
                key={item.id}
                className={`rounded-3xl border p-6 transition-all duration-300 bg-gradient-to-br from-[#0F172A] to-[#1E293B] ${
                  item.isRead
                    ? "border-white/10 hover:border-cyan-500/50"
                    : "border-cyan-500/40 hover:border-cyan-500"
                }`}
              >
                <div className="flex justify-between gap-6">
                  <div className="flex gap-5">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${meta.color} flex items-center justify-center text-white text-2xl shrink-0`}
                    >
                      {meta.icon}
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-white">
                          {item.title}
                        </h3>

                        {!item.isRead && (
                          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
                            NEW
                          </span>
                        )}
                      </div>

                      <p className="text-slate-400 mt-2">{item.body}</p>

                      <div className="flex items-center gap-2 mt-4 text-slate-500">
                        <HiOutlineClock />
                        {dayjs(item.createdAt).fromNow()}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={() => !item.isRead && markRead(item.id)}
                      title={item.isRead ? "Already read" : "Mark as read"}
                      className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 flex items-center justify-center disabled:opacity-40"
                      disabled={item.isRead}
                    >
                      <HiOutlineEye />
                    </button>

                    <button
                      onClick={() => handleToggleRead(item)}
                      title={item.isRead ? "Mark as unread" : "Mark as read"}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        item.isRead
                          ? "bg-green-500/20 text-green-400"
                          : "bg-slate-800 hover:bg-slate-700 text-green-400"
                      }`}
                    >
                      <HiOutlineCheck />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      title={
                        pendingDeleteId === item.id
                          ? "Click again to confirm"
                          : "Delete"
                      }
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        pendingDeleteId === item.id
                          ? "bg-red-500 text-white"
                          : "bg-slate-800 hover:bg-slate-700 text-red-400"
                      }`}
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= FOOTER ================= */}

      <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 p-8">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <HiOutlineBell className="text-5xl text-white mx-auto" />
            <h2 className="text-4xl text-white font-bold mt-3">
              {statsLoading ? "—" : (stats?.total ?? 0)}
            </h2>
            <p className="text-cyan-100">Notifications</p>
          </div>

          <div>
            <HiOutlineArrowPath className="text-5xl text-white mx-auto" />
            <h2 className="text-4xl text-white font-bold mt-3">
              {socketConnected ? "Live" : "Offline"}
            </h2>
            <p className="text-cyan-100">Auto Sync</p>
          </div>

          <div>
            <HiOutlineCheckCircle className="text-5xl text-white mx-auto" />
            <h2 className="text-4xl text-white font-bold mt-3">
              {statsLoading ? "—" : `${stats?.readRate ?? 0}%`}
            </h2>
            <p className="text-cyan-100">Read Rate</p>
          </div>

          <div>
            <HiOutlineInformationCircle className="text-5xl text-white mx-auto" />
            <h2 className="text-4xl text-white font-bold mt-3">
              {statsLoading ? "—" : (stats?.unread ?? 0)}
            </h2>
            <p className="text-cyan-100">Awaiting Review</p>
          </div>
        </div>
      </div>
    </div>
  );
}
