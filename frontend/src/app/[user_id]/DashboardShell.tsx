// DashboardShell.tsx
"use client";

import { useState } from "react";
import Header from "@/features/components/dashboard/Header";
import Sidebar from "@/features/components/sidebar";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
    };
    userId: number;
};

export default function DashboardShell({ children, user, userId }: Props) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex">
            
            <div className=" fixed flex flex-col w-full">
                
                <Header
                    user={user}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                {children}
            </div>

            <Sidebar
                user_id={userId}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

        </div>
    );
}