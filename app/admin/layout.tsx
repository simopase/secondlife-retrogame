import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";

type DashLayoutProps = {
    children?: React.ReactNode
}

export default function DashboardLayout({ children }: DashLayoutProps) {

    return (
        <div className="bg-dashbg h-screen flex flex-col overflow-hidden">
            <Navbar className="border-b-2 border-neutral-700 z-50 bg-background shrink-0"></Navbar>
            <div className="flex flex-1 overflow-hidden">
                <Sidebar></Sidebar>
                <div className="flex-1 overflow-y-auto p-20">
                    {children}
                </div>
            </div>
        </div>
    );
}