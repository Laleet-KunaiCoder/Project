import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContributorCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top Contributor</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center gap-4">
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Olivia Martin</p>
            <p className="text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">+1,999.00</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Olivia Martin</p>
            <p className="text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">+1,999.00</div>
        </div>
      </CardContent>
    </Card>
  );
}
