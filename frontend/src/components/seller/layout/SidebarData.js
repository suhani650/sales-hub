import {
  FaTachometerAlt,
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
  FaStore,
  FaTags,
  FaChartLine,
  FaWallet,
  FaStar,
  FaCog,
  FaBell,
} from "react-icons/fa";

export const sellerSidebarData = [
  {
    title: "Dashboard",
    path: "/seller/dashboard",
    icon: <FaTachometerAlt />,
  },

  {
    title: "Orders",
    path: "/seller/orders",
    icon: <FaShoppingCart />,
  },
  {
    title: "Store Management",
    path: "/seller/store",
    icon: <FaStore />,
  },
  {
    title: "Products",
    path: "/seller/products",
    icon: <FaBoxOpen />,
  },
  {
    title: "Store",
    path: "/seller/store",
    icon: <FaStore />,
  },
  {
    title: "Finance",
    path: "/seller/finance",
    icon: <FaMoneyBillWave />,
  },
  {
    title: "Customers",
    path: "/seller/customers",
    icon: <FaUsers />,
  },

  {
    title: "Store",
    path: "/seller/store",
    icon: <FaStore />,
  },

  {
    title: "Coupons",
    path: "/seller/coupons",
    icon: <FaTags />,
  },

  {
    title: "Analytics",
    path: "/seller/analytics",
    icon: <FaChartLine />,
  },

  {
    title: "Payments",
    path: "/seller/payments",
    icon: <FaWallet />,
  },

  {
    title: "Reviews",
    path: "/seller/reviews",
    icon: <FaStar />,
  },

  {
    title: "Notifications",
    path: "/seller/notifications",
    icon: <FaBell />,
  },
  {
    title: "Marketing",
    path: "/seller/marketing",
    icon: <FaBullhorn />,
  },
  {
    title: "Settings",
    path: "/seller/settings",
    icon: <FaCog />,
  },
];

export default sellerSidebarData;
