import Link from "next/link";
import { Settings } from 'lucide-react';

export default function Sidebar() {
    return (
        <div className="w-auto h-screen bg-neutral-900 text-sidebar p-4 border-r border-neutral-700">
            <Link href={'/admin/dashboard'} className="mb-4 block hover:text-white">Dashboard</Link>
            <Link href={'/admin/page'} className="mb-4 block hover:text-white">Page</Link>
            <Link href="/catalogue" className="mb-4 block hover:text-white">Catalogue</Link>
            <Link href="/settings" className="mb-4 block hover:text-white">Settings</Link>
        </div>
    )

}