import { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ icon, label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`p-6 rounded-xl shadow-md bg-${color}-100`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-full bg-${color}-200`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/api/v1/admin/dashboard");

        console.log("ADMIN DASHBOARD RESPONSE 👉", res.data);

        // 🔥 YE LINE SABSE IMPORTANT HAI
        setStats(res.data.dashboard.itemStats);

      } catch (error) {
        console.error("Admin dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (!stats) return <p className="p-6 text-red-500">No data found</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
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
  );
}
