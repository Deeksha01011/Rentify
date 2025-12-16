
import toast from "react-hot-toast";
import { apiconnector } from "../apiConnector";
import { authEndpoints } from "../apis";



export const fetchAdminAnalytics = async (token) => {
    const toastId = toast.loading("Fetching admin analytics...");
    try{
        const res = await apiconnector("GET",authEndpoints.ADMIN_ANALYTICS,{},{
            Authorization: `Bearer ${token}`
        })

        if(res.data.success === false){
            toast.error(res.data.message, {id: toastId});
            return;
        }
        console.log("Admin analytics response:", res.data);
        toast.success("Admin analytics fetched successfully", {id: toastId});
        return res.data;
            

    }
    catch(error){
        console.error("Error fetching admin analytics:", error);
        toast.error("Failed to fetch admin analytics");
    }
}