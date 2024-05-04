import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Image {
  url: string;
  device_id: number;
  user_id: number;
  id: number;
  description: string;
  created_at: string;
}
interface Props {
  tweet: Image;
  index: number;
}
const BirdDisplayCard: React.FC<Props> = ({ tweet }) => {
  const dateTimeString = tweet.created_at;
  const date = new Date(dateTimeString).toLocaleDateString();
  const time = new Date(dateTimeString).toLocaleTimeString();
  const birdInfo = JSON.parse(tweet.description);

  const birdName = birdInfo.bird_name;
  const detailedDescription = birdInfo.info;

  return (
    <Card className="mx-auto w-[90%]">
      <CardHeader className="py-4">
        <div className="flex flex-row gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Laleet</CardTitle>
            <CardDescription>location</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-1">
        <div className="my-auto flex justify-center items-center ">
          <img className="w-3/4" src={tweet.url} alt="Tweet Image" />
        </div>
        <span className="text-sm">
          Uploaded On: {date} at {time}
        </span>
        <span>Bird Name: {birdName}</span>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger className=" bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-sm p-2">
            Read Description
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{birdName}</DialogTitle>
              <DialogDescription>{detailedDescription}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
export default BirdDisplayCard;
