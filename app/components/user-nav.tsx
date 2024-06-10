import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

interface UserNavProps {
    email: string;
    name: string | undefined;
    userImage: string | undefined;
}

export const UserNav = ({ email, name, userImage }: UserNavProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                >
                    <Avatar>
                        <AvatarImage src={userImage} alt="User Image" />
                        <AvatarFallback>{name}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/sell">Sell Your Product</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Test Item</DropdownMenuItem>
                    <DropdownMenuItem>Test Item</DropdownMenuItem>
                    <DropdownMenuItem>Test Item</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Button variant="secondary" asChild>
                    <LogoutLink>Sign Out</LogoutLink>
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
