import { NavLink } from "react-router-dom";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Bird,
  Search,
  Users,
} from "lucide-react";
const generateNavLinkClasses = ({ isActive, isPending }: any) => {
  let baseClasses =
    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary";
  if (isActive) {
    return `${baseClasses} bg-muted text-primary`;
  } else if (isPending) {
    return `${baseClasses} bg-current text-secondary`;
  } else {
    return `${baseClasses} bg-background text-muted-foreground`;
  }
};

export function SideNavbar() {
  return (
    <div className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky lg:block py-4">
      <nav className="grid items-start px-2 gap-2 text-base font-medium lg:px-4">
        <NavLink to="/" className={generateNavLinkClasses}>
          <Home className="h-4 w-4" />
          Home
        </NavLink>
        <NavLink to="/birds" className={generateNavLinkClasses}>
          <Bird className="h-4 w-4" />
          Explore Birds
        </NavLink>
        <NavLink to="/products" className={generateNavLinkClasses}>
          <Package className="h-4 w-4" />
          Products
        </NavLink>
        <NavLink to="/aboutus" className={generateNavLinkClasses}>
          <Users className="h-4 w-4" />
          About Us
        </NavLink>
        <NavLink to="/analytics" className={generateNavLinkClasses}>
          <LineChart className="h-4 w-4" />
          Analytics
        </NavLink>
      </nav>
    </div>
  );
}
