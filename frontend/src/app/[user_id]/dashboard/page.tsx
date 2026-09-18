import Stats from "@/features/components/dashboard/stats";
import { getUserById } from "@/features/DBquery/queries";



type PageProps = {
    params: Promise<{ user_id: number }>;
};

const DashboardPage = async ({ params }: PageProps) => {
    const { user_id }  = await params;
    const user = await getUserById(user_id);


    return (
        <div className="flex flex-col gap-5 md:gap-10 ">
            <div className="p-4 md:p-10">
                <p className="text-3xl md:text-5xl font-bold">Welcome, {user.name} 👋</p>
                <p className="text-[18px] md:text-[20px] font-semibold">Here is your financial summary</p>
            </div>

            <Stats id={user_id}/>
        </div>
    );
};

export default DashboardPage;