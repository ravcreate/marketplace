"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
    className,
    size,
    children,
}: {
    className?: string;
    size?: string;
    children: React.ReactNode;
}) => {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button className={className} disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>
            ) : (
                <Button className={className} type="submit">
                    {children}
                </Button>
            )}
        </>
    );
};
