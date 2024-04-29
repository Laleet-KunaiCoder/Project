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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BirdDisplayCard() {
  return (
    <Card className="mx-auto w-[90%]">
      <CardHeader className="py-4">
        <div className="flex flex-row gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>hello</CardTitle>
            <CardDescription>naeme</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="my-auto">
          <AspectRatio ratio={4 / 3}>
            <img
              src="https://media.istockphoto.com/id/1407436320/photo/red-munia-bird.jpg?s=1024x1024&w=is&k=20&c=d0zuxDSP_mpPO_vbqAlbVCBOwl2erhgMox45cfrkruo="
              alt="Image"
            />
          </AspectRatio>
        </div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
        magnam ea distinctio! Sequi maiores neque laborum cumque voluptate
        architecto nisi? Temporibus dolor rem dolore alias tempora impedit ut
        cumque! Explicabo.
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <span>Learn more</span> <MoveRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
