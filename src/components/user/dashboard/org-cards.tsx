import { Building2, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import Link from "next/link";

const OrgCards = () => {
  return (
    <div className="grid grid-cols-2 gap-5 w-5/6 text-center">
      <Link href="">
        <Card className="flex flex-col gap-y-5 items-center justify-center rounded-none text-ttickles-blue border-ttickles-darkblue border-4 aspect-square">
          <CardContent className="flex flex-col items-center justify-center">
            <Users size={128} />
          </CardContent>
          <CardFooter className="text-5xl font-bold">
            Join an Organization
          </CardFooter>
        </Card>
      </Link>
      <Link href="">
        <Card className="flex flex-col gap-y-5 items-center justify-center rounded-none text-ttickles-blue border-ttickles-darkblue border-4 aspect-square">
          <CardContent className="flex flex-col items-center justify-center">
            <Building2 size={128} />
          </CardContent>
          <CardFooter className="text-5xl font-bold">
            Create an Organization
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default OrgCards;
