import { ACCOUNT_TYPE } from "../utils/constants";
import {
  LayoutDashboard,
  User,
  Package,
  Heart,
TrendingUp ,
  Settings,
 
  PackageCheck,
} from "lucide-react";
// import { useSelector } from "react-redux";
import { PackageOpen, PackagePlus, PackageX } from "lucide-react";
// import { path } from "framer-motion/client";

export const dashboardLink = [
  {
    id: 1,
    name: "my Profile",
    path: "/dashboard/my-profile",
    icon: <User/>
  },
  {
    id: 2,
    name: "Pending List",
    path: "/dashboard/pending-list",
    type: ACCOUNT_TYPE.ADMIN,
    icon: <PackageOpen />
  },
  {
    id: 3,
    name: "Approved List",
    path: "/dashboard/approved-list",
    type: ACCOUNT_TYPE.ADMIN,
    icon: <PackageCheck />
  },
  {
    id: 4,
    name: "Rejected List",
    path: "/dashboard/rejected-list",
    type: ACCOUNT_TYPE.ADMIN,
    icon: <PackageX />
  },
  //   {
  //     id: 5,
  //     name: "Search Pending List",
  //     path: "/dashboard/search_pending-list",
  //     type: ACCOUNT_TYPE.ADMIN,
  //     icon: <PackageSearch />,
  //   },

  {
    id: 5,
    name: "Rented Items",
    path: "/dashboard/rented-items",
    type: ACCOUNT_TYPE.USER,
    icon: <LayoutDashboard />
  },
  {
    id: 6,
    name: "Listed Items",
    path: "/dashboard/listed-items",
    type: ACCOUNT_TYPE.USER,
    icon: <Package />
  },
  {
    id: 7,
    name: "Wishlist",
    path: "/dashboard/wishlist",
    type: ACCOUNT_TYPE.USER,
    icon: <Heart />
  },
   {

    id:8,
    name:"Stats",
    path:"/dashboard/stats",
    icon:<TrendingUp/>
   },

  {
    id: 9,
    name: "Setting",
    path: "/dashboard/setting",
    icon: <Settings />
  },
];
