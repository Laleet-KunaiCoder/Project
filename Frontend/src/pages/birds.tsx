import BirdDisplayCard from "@/components/ui/bird-display-card";
import { Navbar } from "@/components/Layout/navbar";
import { SideNavbar } from "@/components/Layout/side-navbar";
import BirdDayCard from "@/components/ui/bird-day-card";
import { useEffect } from "react";

export default function Birds() {
   useEffect(() => {
     // Scroll to the top when the component mounts
     window.scrollTo(0, 0);
   }, []);
  return (
    <div className="max-h-screen ">
      <Navbar />
      <div className="  grid w-full md:grid-cols-[1fr] lg:grid-cols-[20vw_1fr]">
        <SideNavbar />
        <main className=" my-14 py-4 top-14 min-h-screen lg:my-14 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 10 }, (_, index) => (
              <BirdDayCard birdId={index} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
