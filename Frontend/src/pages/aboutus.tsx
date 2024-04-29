import BirdDisplayCard from "@/components/ui/bird-display-card";
import { Navbar } from "@/components/Layout/navbar";
import { SideNavbar } from "@/components/Layout/side-navbar";
import  about from "../../public/aboutus.jpg"
import { Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";

export default function AboutUs() {
   useEffect(() => {
     // Scroll to the top when the component mounts
     window.scrollTo(0, 0);
   }, []);
  return (
    <div className="max-h-screen ">
      <Navbar />
      <div className="  grid w-full md:grid-cols-[1fr] lg:grid-cols-[20vw_1fr]">
        <SideNavbar />
        <main className=" my-14  top-14 min-h-screen  lg:my-14 ">
          <div className="mx-auto bg-secondary">
            <div className="flex justify-center items-center  p-8  flex-row flex-wrap">
              <div className="w-full md:w-1/2 p-8 mb-4 md:mb-0 ">
                <h1 className="text-3xl font-semibold mb-4">
                  About Our Platform
                </h1>
                <p className="text-lg mb-6">
                  Our platform is dedicated to capturing and sharing the beauty
                  of birds through images captured by bird feeders equipped with
                  cameras. Here's what you need to know about us:
                </p>
              </div>
              <div className="w-full md:w-1/2 px-8">
                <img
                  src={about}
                  alt="Bird Image"
                  className="w-full mb-4 md:mb-0 object-cover h-[90vw] md:h-auto"
                />
              </div>
            </div>

            <section className=" bg-background">
              <div className="flex  p-8  flex-row flex-wrap">
                <div className="w-full md:w-1/2 p-8 mb-4 md:mb-0 ">
                  <h2 className="text-xl font-semibold mb-2">Mission</h2>
                  <p>
                    Our mission is to create a community-driven platform where
                    bird enthusiasts can share their passion for avian life by
                    capturing and sharing high-quality images of birds in their
                    natural habitats.
                  </p>
                </div>
                <div className="w-full md:w-1/2 p-8 mb-4 md:mb-0 ">
                  <h2 className="text-xl font-semibold mb-2">Vision</h2>
                  <p>
                    We envision a world where people from all walks of life come
                    together to appreciate and conserve the diversity of bird
                    species through the lens of technology.
                  </p>
                </div>
              </div>
            </section>
            <section className=" p-8">
              <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
              <div className="flex items-center mb-4 gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-lg font-semibold">Laleet Borse</h3>
                  <p className="text-gray-600">Roll No :20IE10015</p>
                </div>
              </div>
              <div className="flex items-center mb-4 gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-lg font-semibold">Ikshit Gupta</h3>
                  <p className="text-gray-600">Roll No:20IE10045</p>
                </div>
              </div>
              <p className="">
                If you have any questions, feedback, or inquiries, please feel
                free to contact us at{"  "}
                <span className="inline-flex items-center">
                  <Mail className="w-5 h-5 mx-1 text-primary" />
                  <a
                    className="text-primary hover:underline "
                    href="mailto:laleetsb2002@gmail.com">
                    laleetsb2002@gmail.com
                  </a>
                </span>
                .
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
