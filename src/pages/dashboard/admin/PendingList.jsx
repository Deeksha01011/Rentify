import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IndianRupee } from "lucide-react";

import {
  getPendingList,
  updateStatus,
} from "../../../Services/operations/adminOperations";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PendingList() {
  // const [rejectReason, setRejectReason] = useState("");
  // const [selectedId, setSelectedId] = useState(null);
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
  console.log(pendingItem?.createdAt);

  const getDate = (time) => {
    const date = new Date(time);

    const normalDateTime = date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return normalDateTime;
  };

  console.log(pendingItem);
  // const updatestatus = async (listingId, status, reason) => {
  //   try {
  //     await updateStatus(listingId, status, reason);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const updateStatus = (id, status, reason = "") => {
  //   onUpdate({ listingId: id, status, reason });
  //   setRejectReason("");
  //   setSelectedId(null);
  //
    // 
  };

  return (
    <div className="space-y-6">
      {pendingItem?.length ? (
        pendingItem?.map((listing) => (
          <Link
            to={`/item/${listing._id}`}
            className="w-full bg-gray-200 hover:bg-gray-200"
          >
            <div className="flex bg-gray-100 hover:bg-gray-200 border-[1px] border-gray-200 transition-all duration-300 p-2 rounded-lg">
              <div className="w-[180px] h-full object-cover mr-2">
                <img src={listing?.item?.itemImages[0]} alt="" />
              </div>
              <div className="flex flex-col  w-full">
                <div className="flex item-center justify-between ">
                  <h1 className="text-[#B48C6A] text-xl font-bold">
                    {listing?.item?.itemName}
                  </h1>
                  <h1 className="text-l font-semibold text-gray-600 flex">
                    {" "}
                    <i class="ri-hand-coin-line"></i> {listing?.estimateRent}
                  </h1>
                </div>
                <span className="text-sm text-gray-500 border border-gray-400 w-fit px-1 py-1 rounded-sm mt-1">
                  {listing?.item?.category?.name}
                </span>
                <div className="flex items-center mt-2 justify-between">
                  {" "}
                  <p className="text-[19px] text-semibold text-gray-600 line-clamp-3 ">
                    {listing?.item?.description}
                  </p>
                  <span className="text-l font-semibold text-gray-600">
                    {" "}
                    <i class="ri-calendar-line"></i>{" "}
                    {getDate(listing?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="flex items-center justify-center text-xl text-gray-600 font-bold">No Pending item left</div>
      )}
    </div>
  );
}
