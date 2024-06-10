import Link from "next/link";

import { NavLinks } from "./navbar-links";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

export const Navbar = () => {
    return (
        <nav className="relative max-w-7xl w-full flex  items-center px-4 md:grid md:grid-cols-12 md:px-8 mx-auto py-7">
            <div className="md:col-span-3">
                <Link href="/">
                    <h1 className="text-2xl font-semibold">MarketPlace</h1>
                </Link>
            </div>
            <NavLinks />
            <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
                <Button variant="secondary">Sign In</Button>
                <Button>Sign Up</Button>

                <div className="md:hidden">
                    <MobileMenu />
                </div>
            </div>
        </nav>
    );
};
