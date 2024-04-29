import { Link } from "react-router-dom";
import { Bird } from "lucide-react";

export default function TitleLogo() {
  return (
    <div className=" h-14 border-b px-4 lg:h-[60px] hidden md:flex  lg:px-6 ">
      <Link to="/" className="flex items-center gap-2 font-semibold">
        <Bird className="h-6 w-6" />
        <span className="">SnapNest</span>
      </Link>
    </div>
  );
}
