import BirdDisplayCard from "@/components/ui/bird-display-card";
import { Navbar } from "@/components/Layout/navbar";
import { SideNavbar } from "@/components/Layout/side-navbar";
import { useEffect } from "react";

export default function Products() {
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
          <section className="px-8 py-6">
            <h1 className="text-3xl font-semibold mb-4">
              SnapNest: Smart Bird Feeder Project
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              SnapNest is an innovative project aimed at bird enthusiasts and
              hobbyists who want to capture and appreciate the beauty of birds
              visiting their feeders. Combining cutting-edge technology with a
              love for nature, this project offers a comprehensive solution for
              bird monitoring, image capture, and species identification.
            </p>
            <img
              src="/snapnest_product_image.jpg"
              alt="SnapNest Product"
              className="w-full mb-8"
            />
            <h2 className="text-xl font-semibold mb-4">Features:</h2>
            <ul className="list-disc list-inside mb-8">
              <li>
                <strong>Smart Camera Integration:</strong> SnapNest integrates a
                high-quality camera module with intelligent software to capture
                high-resolution images of visiting birds.
              </li>
              <li>
                <strong>Image Processing and Analysis:</strong> Utilizing
                advanced algorithms, captured images are processed to enhance
                quality and analyze bird behavior.
              </li>
              <li>
                <strong>Seamless Data Transfer:</strong> Images and data are
                seamlessly transferred to a central server for storage,
                analysis, and access from anywhere.
              </li>
              <li>
                <strong>Real-time Monitoring and Reporting:</strong> Users can
                monitor bird activity in real-time and receive automated reports
                on species sightings and feeding patterns.
              </li>
              <li>
                <strong>Scalable and Customizable:</strong> SnapNest is designed
                to be scalable and customizable, allowing users to expand their
                bird monitoring capabilities according to their needs.
              </li>
            </ul>
            <h2 className="text-xl font-semibold mb-4">Components:</h2>
            <ul className="list-disc list-inside mb-8">
              <li>
                <strong>Raspberry Pi 4 Model B:</strong> The powerful Raspberry
                Pi 4 serves as the central processing unit, managing camera
                input, data processing, and network communication.
              </li>
              <li>
                <strong>ESP32 Development Board:</strong> The ESP32 board
                interfaces with camera modules, captures images, and executes
                bird detection algorithms.
              </li>
              <li>
                <strong>Camera Modules:</strong> High-resolution camera modules,
                such as the OV2640, are used to capture clear images of birds
                visiting the feeder.
              </li>
            </ul>
            <h2 className="text-xl font-semibold mb-4">Benefits:</h2>
            <ul className="list-disc list-inside mb-8">
              <li>
                <strong>Enhanced Bird Watching Experience:</strong> SnapNest
                provides an immersive bird watching experience, allowing users
                to observe and learn about bird behavior.
              </li>
              <li>
                <strong>Educational and Conservation Efforts:</strong> By
                collecting data on bird species and feeding habits, users can
                contribute valuable information to conservation efforts and
                educational programs.
              </li>
              <li>
                <strong>Customizable and Expandable:</strong> With modular
                components and customizable software, SnapNest can be tailored
                to specific needs and expanded over time.
              </li>
              <li>
                <strong>Community Engagement:</strong> SnapNest fosters
                community engagement by allowing users to share bird sightings
                and observations, promoting awareness and appreciation of
                wildlife.
              </li>
            </ul>
            <p className="text-lg text-gray-700">
              Experience the wonders of nature like never before with SnapNest –
              your ultimate companion for bird watching and appreciation.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
