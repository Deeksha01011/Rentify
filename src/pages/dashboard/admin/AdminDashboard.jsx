// src/pages/dashboard/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../Services/apiConnector";
import { Package, CheckCircle, Clock, XCircle, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { fetchAdminAnalytics } from "../../../Services/operations/adminOperations";
import { useSelector } from "react-redux";

const StatCard = ({ icon, label, value, color }) => (
 
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 rounded-xl shadow-md bg-white border"
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
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
   const {token} = useSelector((state) => state.auth);

  const fetchDashboard = async () => {
    try {
      const res = await fetchAdminAnalytics(token)

      console.log("ADMIN DASHBOARD RESPONSE", res.data);

      // setStats);
    } catch (error) {
      console.error("Admin dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p className="text-red-500">No data found</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <StatCard icon={<Package />} label="Total Items" value={stats.totalListedItems} color="blue" />
      <StatCard icon={<Clock />} label="Pending" value={stats.pendingLists} color="yellow" />
      <StatCard icon={<CheckCircle />} label="Approved" value={stats.approvedLists} color="green" />
      <StatCard icon={<XCircle />} label="Rejected" value={stats.rejectedLists} color="red" />
      <StatCard icon={<Activity />} label="Active Items" value={stats.activeItems} color="purple" />
    </div>
  );
}
