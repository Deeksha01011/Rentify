import React, { useEffect, useState } from "react";
import ItemDetailsLayout from "../../product/ItemDetailsLayout";
import { useSelector } from "react-redux";
import { getListItemDetails } from "../../../Services/operations/UserOperations";
import { useParams } from "react-router-dom";

const StatusUpdatePage = () => {
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  console.log("id hai",id);
  const [listings, setListings] = useState(null);
  console.log(listings);
  

  useEffect(() => {
    const getList = async () => {
      try {
        const data = await getListItemDetails(id,token);
        setListings(data); // ✅ API ka response
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      getList();
    }
  }, [token]);
  return (
    <div>
      <ItemDetailsLayout data={listings} />
    </div>
  );
};

export default StatusUpdatePage;
