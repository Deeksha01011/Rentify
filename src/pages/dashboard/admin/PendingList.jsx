import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  getPendingList,
  updateStatus,
} from "../../../Services/operations/adminOperations";
import { useSelector } from "react-redux";

export default function PendingList() {
  const [rejectReason, setRejectReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [pendingItem, setPendingItem] = useState(null);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getList = async () => {
      const list = await getPendingList(token);
      console.log(list);
      setPendingItem(list);
    };
    getList();
  }, []);
  
  console.log(pendingItem)
  const updatestatus = async (listingId, status, reason) => {
    try {
      await updateStatus(listingId, status, reason);
    } catch (error) {
      console.log(error);
    }
  };
  // const updateStatus = (id, status, reason = "") => {
  //   onUpdate({ listingId: id, status, reason });
  //   setRejectReason("");
  //   setSelectedId(null);
  // };

  return (
    <div className="space-y-6">
      {pendingItem?.map((listing) => (
        <motion.div
          key={listing._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white rounded-xl shadow-md border"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{listing?.item?.itemName}</h3>
              <p className="text-sm text-gray-500">
                By {listing.listedBy.name} ({listing.listedBy.email})
              </p>
            </div>

            <div className="flex gap-3">
              {/* APPROVE */}
              <button
                onClick={() =>{ updatestatus(listing._id, "approved")}}
                className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200"
              >
                <Check size={16} /> Approve
              </button>

              {/* REJECT */}
              <button
                onClick={() =>{
                  setSelectedId(listing._id);
                  updatestatus(listing._id, "rejected", rejectReason)}
                }
                className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200"
              >
                <X size={16} /> Reject
              </button>
            </div>
          </div>

          {/* REJECT INPUT */}
          {selectedId === listing._id && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              className="mt-4"
            >
              <textarea
                placeholder="Reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full border rounded-md p-2"
              />
              <button
                onClick={() =>
                  updateStatus(listing._id, "rejected", rejectReason)
                }
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Confirm Reject
              </button>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
