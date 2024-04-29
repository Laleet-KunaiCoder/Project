import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import { LogIn } from "./pages/login";
import Birds from "./pages/birds";
import Products from "./pages/products";
import Analytics from "./pages/analytics";
import AboutUs from "./pages/aboutus";
import BirdDetails from "./pages/birddetail";

const router = createBrowserRouter([
  {
    path: "login",
    element: <LogIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "",
    element: <Home />,
  },
  {
    path: "birds",
    element: <Birds />,
  },
  {
    path: "bird/:birdId",
    element: <BirdDetails />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "analytics",
    element: <Analytics />,
  },
  {
    path: "aboutus",
    element: <AboutUs />,
  },
]);
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    
        <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
