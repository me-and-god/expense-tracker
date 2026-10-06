import { ReactNode } from "react";
import { getUserById } from "@/features/DBquery/queries";
import DashboardShell from "./DashboardShell";

type PageProps = {
    children: ReactNode;
    params: Promise<{ user_id: string }>;
};

const Layout = async ({ children, params }: PageProps) => {

    const UserId = await params;
    const id = Number(UserId.user_id);

    const user = await getUserById(id);

    return (
        <DashboardShell
            user={user}
            userId={id}
        >
            {children}
        </DashboardShell>
    );
};

export default Layout;
