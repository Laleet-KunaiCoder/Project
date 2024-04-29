import BirdDisplayCard from "@/components/ui/bird-display-card";
import { Navbar } from "@/components/Layout/navbar";
import { SideNavbar } from "@/components/Layout/side-navbar";
import { RightSidebar } from "@/components/Layout/right-sidebar";
import { useEffect } from "react";

export default function Home() {
   useEffect(() => {
     // Scroll to the top when the component mounts
     window.scrollTo(0, 0);
   }, []);
  return (
    <div className="max-h-screen  overflow-y">
      <Navbar />
      <div className="  grid w-full md:grid-cols-[1fr] lg:grid-cols-[20vw_1fr]">
        <SideNavbar />
        <main className=" my-14 py-4 top-14 min-h-screen lg:my-14 grid w-full md:grid-cols-[1fr_40vw] lg:grid-cols-[1fr_max(400px,28vw)] ">
          <div className="flex gap-8 flex-col">
            {Array.from({ length: 10 }, (_, index) => (
              <BirdDisplayCard />
            ))}
          </div>
          <RightSidebar />
        </main>
      </div>
    </div>
  );
}
