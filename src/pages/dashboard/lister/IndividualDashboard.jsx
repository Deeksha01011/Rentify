// src/pages/dashboard/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
// import { axiosInstance } from "../../../Services/apiConnector";
import { Package, CheckCircle, Clock, XCircle, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { getAdminAnalytics } from "../../../Services/operations/adminOperations";
import { useSelector } from "react-redux";
import { getUserStats } from "../../../Services/operations/UserOperations";
import ListerCard from "./ListerCard";

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
const IndividualDashboard = () => {
  const [stats, setStats] = useState(null);
  // const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  const fetchDashboard = async () => {
    try {
      const res = await getUserStats(token);

      console.log("USER DASHBOARD RESPONSE", res);
      console.log(res);
      setStats(res);
      // setRevenue(res?.revenue);
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
  // console.log("Revenue dost", revenue);
  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p className="text-red-500">No data found</p>;
  return (
    <>
      <h1 className="flex items-center justify-center text-[30px] font-semibold">User Dashboard</h1>
      <h3 className="text-[25px] font-semibold text-gray-800 mt-5">Item Stats</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          icon={<Package />}
          label="Total Items"
          value={stats.totalListings}
          color="blue"
        />
        <StatCard
          icon={<Clock />}
          label="Pending"
          value={stats.pending}
          color="yellow"
        />
        <StatCard
          icon={<CheckCircle />}
          label="Approved"
          value={stats.approved}
          color="green"
        />
        <StatCard
          icon={<XCircle />}
          label="Rejected"
          value={stats.rejected}
          color="red"
        />
        <StatCard
          icon={<Activity />}
          label="Active Items"
          value={stats.totalRentedItems}
          color="purple"
        />
        <StatCard
          icon={<Package />}
          label="Total Earning"
          value={stats.totalEarnings}
          color="blue"
        />
      </div>
      <div>
        <h3 className="text-[25px] font-semibold text-gray-800 mt-5">Listed items</h3>

        <div className=" mt-10 flex gap-15 flex-wrap">
          {stats.listings &&
            stats.listings.map((item, i) => (
              <ListerCard key={i} itemData={item} />
            ))}
        </div>
      </div>
    </>
  );
};

export default IndividualDashboard;
