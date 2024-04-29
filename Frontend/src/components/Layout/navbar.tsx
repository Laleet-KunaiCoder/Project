import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Bird,
  Users,
  Search,
  LogOut,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  const getUserName = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      };
      console.log(config);
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_ENDPOINT}/username/`,
        config
      );

      setUserName(response.data.username);
    } catch (error) {
      console.error("Error fetching user information:", error);
      navigate("/login");
    }
  };
  useEffect(() => {
    getUserName();
  }, []);
  return (
    <header className="fixed top-0 w-full z-50 flex  items-center justify-between border-b bg-accent px-4 h-14 lg:h-16 lg:px-6">
      <div className=" h-16 border-b px-4 lg:h-[60px] hidden lg:flex  lg:px-6 ">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Bird className="h-6 w-6" />
          <span className="">SnapNest</span>
        </Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold">
              <Bird className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              to="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link
              to="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
              <Bird className="h-5 w-5" />
              Explore Birds
            </Link>
            <Link
              to="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              to="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
              <Users className="h-5 w-5" />
              Customers
            </Link>
            <Link
              to="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
              <LineChart className="h-5 w-5" />
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className=" w-3/4 flex flex-rows justify-center  gap-4">
        <div className="flex-1">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Bird..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-1/2 lg:w-1/2"
              />
            </div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex row gap-1">
              <span className=" text-cyan-700"> #{userName}</span>
              <Handshake className="h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem>Setting</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  );
}
