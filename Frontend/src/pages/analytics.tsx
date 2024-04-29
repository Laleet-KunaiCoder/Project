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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adImage: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Your form submission logic goes here
  };
  
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
          <main className=" my-14 py-4 top-14 min-h-screen lg:my-14 grid w-full md:grid-cols-[1fr]  ">
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
                                  setSelectedImage(e.target.files?.[0] || null);
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
          </main>
        </div>
      </div>
    </>
  );
}
