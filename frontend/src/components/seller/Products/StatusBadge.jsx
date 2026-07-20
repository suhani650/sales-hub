import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBan,
  FaFileAlt,
  FaBoxOpen,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function StatusBadge({ status = "Pending" }) {
  const statusConfig = {
    Approved: {
      icon: <FaCheckCircle />,
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-300",
    },

    Pending: {
      icon: <FaClock />,
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-300",
    },

    Rejected: {
      icon: <FaTimesCircle />,
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-300",
    },

    Blocked: {
      icon: <FaBan />,
      bg: "bg-gray-200",
      text: "text-gray-700",
      border: "border-gray-300",
    },

    Draft: {
      icon: <FaFileAlt />,
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-300",
    },

    "Out of Stock": {
      icon: <FaBoxOpen />,
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-300",
    },

    "Low Stock": {
      icon: <FaExclamationTriangle />,
      bg: "bg-orange-100",
      text: "text-orange-700",
      border: "border-orange-300",
    },
  };

  const current = statusConfig[status] || statusConfig.Pending;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        px-3
        py-1.5
        rounded-full
        text-xs
        font-semibold
        border
        ${current.bg}
        ${current.text}
        ${current.border}
      `}
    >
      {current.icon}

      {status}
    </span>
  );
}
