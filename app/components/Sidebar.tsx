import Link from "next/link";
import { Home, Pencil } from 'lucide-react';

export default function Sidebar() {
    return (
        <div className="w-auto h-screen bg-neutral-900 text-sidebar p-8 border-r border-neutral-700 sticky top-20">
            <Link href={'/admin/dashboard'} className="mb-4 flex gap-3 hover:text-white">
                <Home size={20}/>
                Dashboard
            </Link>
            <Link href={'/admin/page'} className="mb-4 flex gap-3 hover:text-white">
                <Pencil size={20}/>
                Page
            </Link>
            <Link href={"/admin/catalogue"} className="mb-4 block hover:text-white">Catalogue</Link>
            <Link href={"/admin/settings"} className="mb-4 block hover:text-white">Settings</Link>
        </div>
    )

}