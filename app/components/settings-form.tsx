"use client";

import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";
import { updateUserSettings } from "@/lib/actions";
import { State } from "@/lib/type";
import { useEffect } from "react";
import { toast } from "sonner";

interface SettingsFormProps {
    firstName: string;
    lastName: string;
    email: string;
}

/**
 *	Component Starts Here
 */
const SettingsForm = ({ firstName, lastName, email }: SettingsFormProps) => {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(updateUserSettings, initialState);

    useEffect(() => {
        if (state?.status === "error") {
            toast.error(state?.message);
        } else if (state?.status === "success") {
            toast.success(state.message);
        }
    }, [state]);

    return (
        <form action={formAction}>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                    Here you will find settings regarding your account
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-5">
                <div className="flex flex-col gap-y-2">
                    <Label>First Name</Label>
                    <Input
                        name="firstName"
                        type="text"
                        defaultValue={firstName}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Last Name</Label>
                    <Input
                        name="lastName"
                        type="text"
                        defaultValue={lastName}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Email</Label>
                    <Input
                        name="email"
                        type="email"
                        disabled
                        defaultValue={"jan@alenix.de"}
                    />
                </div>
            </CardContent>

            <CardFooter>
                <SubmitButton>Update your settings</SubmitButton>
            </CardFooter>
        </form>
    );
};

export default SettingsForm;
