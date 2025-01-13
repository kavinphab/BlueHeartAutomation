import OrgCards from "@/components/user/dashboard/org-cards";

const Page = () => {
  return (
    <div className="flex flex-col w-11/12 items-center py-5">
      <div className="text-4xl font-bold items-start w-11/12 gap-2">
        Currently Not In an Organization
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <OrgCards />
      </div>
    </div>
  );
};
export default Page;
