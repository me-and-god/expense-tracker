import Header from "@/features/components/dashboard/Header"
import { ReactNode } from "react"
import { getUserById } from "@/features/DBquery/queries";


type PageProps = {
    children: ReactNode;
    params: Promise<{ user_id: string }>;
};

const layout = async({ children,params }: PageProps) => {

    const { user_id } = await params;
    const id = Number(user_id);
    const user = await getUserById(id);

    
    return (
        <div>
            <Header user={user}/>
            {children}
        </div>
    );
};

export default layout;