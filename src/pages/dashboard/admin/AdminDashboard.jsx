// src/pages/dashboard/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
// import { axiosInstance } from "../../../Services/apiConnector";
import { Package, CheckCircle, Clock, XCircle, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { getAdminAnalytics } from "../../../Services/operations/adminOperations";
import { useSelector } from "react-redux";

// import { motion } from "framer-motion";

const colorVariants = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    ring: "ring-blue-200",
    glow: "hover:shadow-blue-300/40",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    ring: "ring-green-200",
    glow: "hover:shadow-green-300/40",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    ring: "ring-yellow-200",
    glow: "hover:shadow-yellow-300/40",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    ring: "ring-red-200",
    glow: "hover:shadow-red-300/40",
  },
};

const StatCard = ({ icon, label, value, color }) => {
  // ✅ SAFETY FALLBACK
  const styles = colorVariants[color] || colorVariants.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 180 }}
      className={`p-6 rounded-2xl bg-white/80 backdrop-blur 
        border ring-1 ${styles.ring}
        shadow-md ${styles.glow}
        hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ rotate: 10 }}
          className={`p-4 rounded-full ${styles.bg} ${styles.text}`}
        >
          {icon}
        </motion.div>

        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        </div>
      </div>
    </motion.div>
  );
};


// export default StatCard;


export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  const fetchDashboard = async () => {
    try {
      const res = await getAdminAnalytics(token);

      console.log("ADMIN DASHBOARD RESPONSE", res);

      setStats(res?.itemStats);
      setRevenue(res?.revenue);
    } catch (error) {
      console.error("Admin dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  console.log("Data dost", stats);
  console.log("Revenue dost", revenue);
  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p className="text-red-500">No data found</p>;

  return (
    <>
      <h1 className="flex items-center justify-center text-[30px] font-semibold">Admin Dashboard</h1>
      <h3 className="text-[25px] font-semibold text-gray-800 mt-5">Item Stats</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          icon={<Package />}
          label="Total Items"
          value={stats.totalListedItems}
          color="blue"
        />
        <StatCard
          icon={<Clock />}
          label="Pending"
          value={stats.pendingLists}
          color="yellow"
        />
        <StatCard
          icon={<CheckCircle />}
          label="Approved"
          value={stats.approvedLists}
          color="green"
        />
        <StatCard
          icon={<XCircle />}
          label="Rejected"
          value={stats.rejectedLists}
          color="red"
        />
        <StatCard
          icon={<Activity />}
          label="Active Items"
          value={stats.activeItems}
          color="purple"
        />
      </div>
      <h3 className="text-[25px] font-semibold text-gray-800 mt-5">Revenue</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          icon={<Package />}
          label="Total Platform free"
          value={revenue.totalPlatformFee}
          color="blue"
        />
        <StatCard
          icon={<Clock />}
          label={"Total GST"}
          value={revenue.totalGst}
          color="yellow"
        />
        <StatCard
          icon={<CheckCircle />}
          label="Total Revenue"
          value={revenue.totalRevenue}
          color="green"
        />
        <StatCard
          icon={<XCircle />}
          label="Total Security Deposit"
          value={revenue.totalSecurityDeposit}
          color="red"
        />
        <StatCard
          icon={<Activity />}
          label="Total Delivery"
          value={revenue.totalDeliveryCharges}
          color="purple"
        />
      </div>
    </>
  );
}
