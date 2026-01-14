import Image from "next/image";

type NavbarProps = {
    className?: string;
    children?: React.ReactNode;
}

export default function Navbar({ className, children }: NavbarProps) {
    return <>
        <div className={`p-4 text-white ${className} min-h-20`}>
            <Image src="/logo.png" alt="Sidebar Logo" width={150} height={150}></Image>
            {children}
        </div>
    </>
}