import Link from "next/link";
import { Settings } from 'lucide-react';

export default function Sidebar() {
    return (
        <div className="w-auto h-screen bg-neutral-900 text-sidebar p-4 border-r border-neutral-700">
            <Link href="/settings" className="mb-4 block hover:text-white">Settings</Link>
        </div>
    )

}