import BirdDisplayCard from "@/components/ui/bird-display-card";
import { Navbar } from "@/components/Layout/navbar";
import { SideNavbar } from "@/components/Layout/side-navbar";
import { RightSidebar } from "@/components/Layout/right-sidebar";

export function Test() {
  return (
    <div className="max-h-screen ">
      <Navbar />
      <div className="  grid w-full md:grid-cols-[1fr_40vw] lg:grid-cols-[20vw_1fr_max(400px,28vw)]">
        <SideNavbar />
        <main className=" my-14 py-4 top-14 min-h-screen lg:my-14 ">
          <div className="flex gap-8 flex-col">
            {Array.from({ length: 10 }, (_, index) => (
              <BirdDisplayCard />
            ))}
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}
