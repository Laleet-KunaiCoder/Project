import BirdDayCard from "../ui/bird-day-card";
import ContributorCard from "../ui/contributer-card";
export function RightSidebar(){
    return (
      <aside className="fixed top-14 lg:top-16 z-30  hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block py-4 overflow-y-scroll">
        <div className="  flex flex-col gap-8 justify-center items-center my-8 mx-4">
          <BirdDayCard />
          <ContributorCard />
        </div>
      </aside>
    );
}