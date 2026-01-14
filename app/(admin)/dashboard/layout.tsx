import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";

type DashLayoutProps = {
    children?: React.ReactNode
}
export default function DashboardLayout({ children }: DashLayoutProps) {

    return <div className="bg-dashbg">
        <Navbar></Navbar>
        <div className="flex">
            <Sidebar></Sidebar>
            <div className="flex-1 ">
                {children}
            </div>
        </div>
    </div>

}