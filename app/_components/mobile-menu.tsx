"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navbarLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileMenu = () => {
    const path = usePathname();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <div className="flex flex-col mt-5 px-2">
                    {navbarLinks.map((item) => (
                        <Link
                            href={item.href}
                            key={item.id}
                            className={cn(
                                "group flex items-center px-3 py-4 font-medium rounded-md",
                                path === item.href
                                    ? "bg-slate-300"
                                    : "hover:bg-opacity-75"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};
