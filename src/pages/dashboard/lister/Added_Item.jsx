import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getMylisting } from "../../../Services/operations/UserOperations";
import ListerCard from "./ListerCard";

const Added_Item = () => {
  const { token } = useSelector((state) => state.auth);

  const [listing, setListing] = useState();
  useEffect(() => {
    const fetchList = async () => {
      const res = await getMylisting(token);

      setListing(res);
    };

    fetchList();
  }, []);
  console.log(listing);

  return (
    <div className="mt-5">
      <Link
        className="text-gray-200 bg-gray-800 mt-2 p-2 border rounded-md"
        to={"/dashboard/listitems"}
      >
        Add item <i class="ri-add-fill"></i>
      </Link>

      <div className=" mt-10 flex gap-15 flex-wrap">
        {listing &&
        listing.map((item, i) => <ListerCard key={i} itemData={item} />)}
      </div>
    </div>
  );
};

export default Added_Item;
