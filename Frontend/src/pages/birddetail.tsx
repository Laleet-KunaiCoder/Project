import BirdDisplayCard from "@/components/ui/bird-display-card";
import { Navbar } from "@/components/Layout/navbar";
import { SideNavbar } from "@/components/Layout/side-navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BirdDetails() {
  const { birdId } = useParams();
  const [birdData, setBirdData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bird data based on the birdId
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/birds/${birdId}`); // Adjust the URL as per your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch bird data");
        }
        const data = await response.json();
        setBirdData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        // Handle error state
      }
    };

    fetchData();

    // Clean up function
    return () => {
      // Cancel any ongoing fetch request or cleanup
    };
  }, [birdId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!birdData) {
    return <div>No data available for this bird</div>;
  }

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-h-screen ">
      <Navbar />
      <div className="  grid w-full md:grid-cols-[1fr_40vw] lg:grid-cols-[20vw_1fr]">
        <SideNavbar />
        <main className="my-14 py-4 top-14 min-h-screen lg:my-14">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
          temporibus dicta! Veritatis officiis facilis ad hic eligendi eveniet.
          Voluptatem nemo reprehenderit necessitatibus, numquam consequatur
          recusandae delectus non nisi quisquam architecto. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Dolor debitis, autem
          consectetur repellendus sint nemo vero eligendi reprehenderit fuga qui
          dicta, ducimus commodi sapiente deleniti quis. Quis animi labore
          similique.
        </main>
      </div>
    </div>
  );
}
