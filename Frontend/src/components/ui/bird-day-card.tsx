import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";

export default function BirdDayCard({ birdId }:any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bird Of The Day</CardTitle>
        <CardDescription>Common Poorwill</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="w-full my-auto">
          <AspectRatio ratio={4 / 3}>
            <img
              src="https://media.istockphoto.com/id/1407436320/photo/red-munia-bird.jpg?s=1024x1024&w=is&k=20&c=d0zuxDSP_mpPO_vbqAlbVCBOwl2erhgMox45cfrkruo="
              alt="Image"
            />
          </AspectRatio>
        </div>
        <p className="text-sm">
          Description: Small, nocturnal bird (19-23 cm) with a long, pointed
          tail and mottled brown and gray plumage.  Large eyes with black
          pupils and white eyelids.  Short, inconspicuous bill with bristles
          around the mouth.  Camouflages well with foliage and tree bark
        </p>
      </CardContent>
      <CardFooter>
        <Link to={`/bird/${birdId}`}>
          <Button className="w-full">
            <span>Learn more</span> <MoveRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
