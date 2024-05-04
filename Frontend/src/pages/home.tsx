import BirdDisplayCard from "@/components/ui/bird-display-card";
import { Navbar } from "@/components/Layout/navbar";
import { SideNavbar } from "@/components/Layout/side-navbar";
import { RightSidebar } from "@/components/Layout/right-sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

interface Image {
  url: string;
  device_id: number;
  user_id: number;
  id: number;
  description: string;
  created_at: string;
}

export default function Home() {
  const [tweets, setTweets] = useState<Image[]>([]);
  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_ENDPOINT}/images`
      );
      console.log(response.data);
      setTweets(response.data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-h-screen  overflow-y">
      <Navbar />
      <div className="  grid w-full md:grid-cols-[1fr] lg:grid-cols-[20vw_1fr]">
        <SideNavbar />
        <main className=" my-14 py-4 top-14 min-h-screen lg:my-14 grid w-full md:grid-cols-[1fr_40vw] lg:grid-cols-[1fr_max(400px,28vw)] ">
          <div className="flex gap-8 flex-col">
            {tweets?.length > 0 ? (
              tweets.map((tweet, index) => <BirdDisplayCard tweet={tweet} index={index} />)
            ) : (
              <p>No tweets found yet</p>
            )}
          </div>
          <RightSidebar />
        </main>
      </div>
    </div>
  );
}
