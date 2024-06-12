"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { NavLinks } from "./navbar-links";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import {
    LoginLink,
    LogoutLink,
    RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { UserNav } from "./user-nav";

/**
 *	Component Starts Here
 */
export const Navbar = () => {
    const { user } = useKindeBrowserClient();

    return (
        <nav className="relative max-w-7xl w-full h-[60px] flex  items-center justify-center px-4 mx-auto md:grid md:grid-cols-12 md:px-8">
            <div className="md:col-span-3">
                <Link href="/">
                    <h1 className="text-2xl font-semibold">MarketPlace</h1>
                </Link>
            </div>
            <NavLinks />

            <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
                {user && (
                    <UserNav
                        email={user.email as string}
                        name={user.given_name as string}
                        userImage={
                            user.picture ??
                            `https://avatar.vercel.sh/${user.given_name}`
                        }
                    />
                )}

                {!user && (
                    <div className="flex items-center gap-x-2">
                        <Button variant="secondary" asChild>
                            <LoginLink>Sign In</LoginLink>
                        </Button>
                        <Button asChild>
                            <RegisterLink>Sign Up</RegisterLink>
                        </Button>
                    </div>
                )}

                <div className="md:hidden">
                    <MobileMenu />
                </div>
            </div>
        </nav>
    );
};
