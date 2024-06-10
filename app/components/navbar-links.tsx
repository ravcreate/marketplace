"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { navbarLinks } from "@/lib/data";

export const NavLinks = () => {
    const path = usePathname();
    console.log(path);

    return (
        <div className="hidden justify-center items-center col-span-6 gap-x-2 md:flex">
            {navbarLinks.map((item) => (
                <Link
                    href={item.href}
                    key={item.id}
                    className={cn(
                        "group flex items-center px-3 py-1 font-medium rounded-md",
                        path === item.href
                            ? "bg-slate-300"
                            : "hover:bg-opacity-75"
                    )}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
};
