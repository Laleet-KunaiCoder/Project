import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Layout/navbar";
import { SideNavbar } from "@/components/Layout/side-navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Device {
  id: number;
  device_id: string;
  longitude: string;
  latitude: string;
  user_id: number;
}

const formSchema = z.object({
  device_id: z.string(),
  latitude: z.string(),
  longitude: z.string(),
});

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TitleLogo from "@/components/ui/title-logo";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

export default function Setting() {
  const [devices, setDevices] = useState<Device[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      device_id: "",
      latitude: "",
      longitude: "",
    },
  });
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

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      };
      const formData = {
        device_id: values.device_id,
        latitude: parseFloat(values.latitude),
        longitude: parseFloat(values.longitude),
      };
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_ENDPOINT}/createdevice/`,
        formData,
        config
      );
      
      navigate("/"); // Redirect to home page after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-h-screen ">
      <Navbar />
      <div className="  grid w-full md:grid-cols-[1fr] lg:grid-cols-[20vw_1fr]">
        <SideNavbar />
        <main className=" my-14 py-4 top-14 min-h-screen lg:my-14 ">
          <div className=" mx-16">
            <div className=" h-14 border-b  px-4 lg:h-[60px]  flex flex-row gap-2 items-center  lg:px-6 ">
              <Camera className="h-6 w-6" />
              <span className=" font-bold text-lg">My Device</span>
            </div>
            <Table>
              <TableCaption>A list of your Device.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Device Name</TableHead>
                  <TableHead>Longitude</TableHead>

                  <TableHead>Latitude</TableHead>
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
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-center " colSpan={3}>
                      No devices found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="min-h-screen flex justify-center items-center">
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Link New Device</CardTitle>
                </CardHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <CardContent className="grid gap-4 pb-0">
                      <FormField
                        control={form.control}
                        name="device_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Device ID</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter device ID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                placeholder="Enter latitude"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="any"
                                placeholder="Enter longitude"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter className="flex flex-col gap-1 pt-0 mt-0">
                      <Button className="w-full" type="submit">
                        Submit
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
