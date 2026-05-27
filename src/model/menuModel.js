import DashboardIcon from "@mui/icons-material/Dashboard";
import HandymanIcon from "@mui/icons-material/Handyman";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReportIcon from "@mui/icons-material/Report";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ReceiptIcon from "@mui/icons-material/Receipt";

const allMenu = [
  {
    admin: [
      { label: "Dashboard", property: "dashboard", icon: <DashboardIcon /> },
      { label: "Accessories", property: "accessories", icon: <HandymanIcon /> },
      { label: "Category", property: "category", icon: <CategoryIcon /> },
      { label: "Users", property: "users", icon: <PeopleAltIcon /> },
      { label: "Report", property: "report", icon: <ReportIcon /> },
    ],
    customer: [
      { label: "Dashboard", property: "dashboard", icon: <DashboardIcon /> },
      { label: "My Invoices", property: "invoice", icon: <ReceiptIcon /> },
    ],
    manager: [
      { label: "Dashboard", property: "dashboard", icon: <DashboardIcon /> },
      { label: "Accessory", property: "accessory", icon: <HandymanIcon /> },
    ],
    employee: [
      { label: "Dashboard", property: "dashboard", icon: <DashboardIcon /> },
      { label: "Accessory", property: "accessory", icon: <HandymanIcon /> },
      {
        label: "Selling Accessories",
        property: "selling-accessories",
        icon: <StorefrontIcon />,
      },
    ],
  },
];

export default allMenu;
