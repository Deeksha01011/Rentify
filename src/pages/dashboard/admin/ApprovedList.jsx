import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getApprovedList } from "../../../Services/operations/adminOperations";

export default function ApprovedList() {
  const { token } = useSelector((state) => state.auth);
  const [listings, setListings] = useState(null);
  console.log(listings);

  useEffect(() => {
    const getList = async () => {
      try {
        const data = await getApprovedList(token);
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
    <div className="grid gap-6">
      {listings?.map((item) => (
        <div key={item._id} className="p-6 bg-green-50 rounded-xl shadow">
          <h3 className="font-bold">{item?.item?.itemName}</h3>
          <p className="text-sm text-gray-600">
            Approved on {new Date(item.listedOn).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
