import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SideNavbar } from "@/components/Layout/side-navbar";
import { Navbar } from "@/components/Layout/navbar";
import axios from "axios";
import { Camera } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface Device {
  id: number;
  device_id: string;
  longitude: string;
  latitude: string;
  user_id: number;
}
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  adImage: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max image size is 5MB.`,
    })
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export default function Analytics() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adImage: undefined,
    },
  });
  const [devices, setDevices] = useState<Device[]>([]);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData(); // Add the selected device ID to the form data
      formData.append("file", data.adImage[0]); // Add the uploaded image file to the form data
      console.log(data.adImage[0]);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json", // Set content type to multipart/form-data for file upload
        },
      };
      console.log(selectedDeviceId);
      // Send a POST request to the backend route for uploading image
      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_API_ENDPOINT
        }/devices/upload-image/?device_id=${selectedDeviceId}`,
        formData,
        config
      );

      console.log(response.data); // Log the response from the backend
      setSelectedDeviceId(null);
      setSelectedImage(null);
      // Your additional logic for handling the response goes here
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      };
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_ENDPOINT}/devices`,
        config
      );
      console.log(response);
      setDevices(response.data.devices);
      console.log(devices);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="max-h-screen ">
        <Navbar />
        <div className="  grid w-full md:grid-cols-[1fr] lg:grid-cols-[20vw_1fr]">
          <SideNavbar />
          <main className=" my-14 py-4 top-14 min-h-screen md:my-14  w-full ">
            <div className="mx-16">
              <div className=" h-14 border-b  px-4 lg:h-[60px]  flex flex-row gap-2 items-center  lg:px-6 ">
                <Camera className="h-6 w-6" />
                <span className=" font-bold text-lg">Select One Device</span>
              </div>
              <Table>
                <TableCaption>A list of your Device.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Device Name</TableHead>
                    <TableHead>Longitude</TableHead>

                    <TableHead>Latitude</TableHead>
                    <TableHead>Select</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.length > 0 ? (
                    devices.map((device, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {device.device_id}
                        </TableCell>
                        <TableCell>{device.longitude}</TableCell>
                        <TableCell>{device.latitude}</TableCell>
                        <TableCell>
                          <Checkbox
                            onClick={() =>{console.log(selectedDeviceId);setSelectedDeviceId(device.id);console.log(selectedDeviceId);}}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className="text-center " colSpan={4}>
                        No devices found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex w-full gap-4 flex-col">
                    <FormLabel>Uplaod Image</FormLabel>
                    <div className="flex w-full gap-4 p-4 rounded border border-neutral-200 flex-col items-center  md:justify-between md:items-center">
                      <div className="flex md:flex-[1] h-[fit-content] md:p-4 md:justify-between ">
                        {selectedImage ? (
                          <div className="md:max-w-[90%] ">
                            <img
                              src={URL.createObjectURL(selectedImage)}
                              alt="Selected"
                            />
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <FormField
                        control={form.control}
                        name="adImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Button size="lg" type="button">
                                <input
                                  type="file"
                                  className="hidden"
                                  id="fileInput"
                                  accept="image/*"
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  onChange={(e) => {
                                    field.onChange(e.target.files);
                                    setSelectedImage(
                                      e.target.files?.[0] || null
                                    );
                                  }}
                                  ref={field.ref}
                                />
                                <label htmlFor="fileInput">
                                  <span className="whitespace-nowrap">
                                    Choose your image
                                  </span>
                                </label>
                              </Button>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Button className="my-4 w-full  py-4 px-4" type="submit">
                    <span>SUBMIT</span>
                  </Button>
                </form>
              </Form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
