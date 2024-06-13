"use client";

import { UploadDropzone } from "@/lib/uploadingthing";

import { TipTapEditor } from "@/app/components/editor";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "@/app/components/select-category";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { useFormState } from "react-dom";
import { sellProduct } from "@/lib/actions";
import { State } from "@/lib/type";
import { toast } from "sonner";
import { SubmitButton } from "@/app/components/submit-button";
import { redirect } from "next/navigation";

/**
 *	Component Starts Here
 */
const SellForm = () => {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(sellProduct, initialState);

    const [json, setJson] = useState<null | JSONContent>(null);
    const [images, setImages] = useState<null | string[]>(null);
    const [productFile, SetProductFile] = useState<null | string>(null);

    //console.log(state?.errors);
    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
            redirect("/");
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={formAction}>
            <CardHeader>
                <CardTitle>Sell your product with ease</CardTitle>
                <CardDescription>
                    Please describe your product here in details so that it can
                    be sold.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-10">
                <div className="flex flex-col gap-y-2">
                    <Label>Name</Label>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Name of your product"
                        required
                        min={3}
                    />
                    {state?.errors?.["name"]?.[0] && (
                        <p className="text-destructive">
                            {state?.errors?.["name"]?.[0]}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>
                        <SelectCategory />
                    </Label>
                    {state?.errors?.["category"]?.[0] && (
                        <p className="text-destructive">
                            {state?.errors?.["category"]?.[0]}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label>Price</Label>
                    <Input
                        name="price"
                        placeholder="$29"
                        type="number"
                        required
                        min={1}
                    />
                    {state?.errors?.["price"]?.[0] && (
                        <p className="text-destructive">
                            {state?.errors?.["price"]?.[0]}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label>Small Summary</Label>
                    <Textarea
                        name="smallDescription"
                        placeholder="Please describe your product shortly right here..."
                        required
                        minLength={10}
                    />
                    {state?.errors?.["smallDescription"]?.[0] && (
                        <p className="text-destructive">
                            {state?.errors?.["smallDescription"]?.[0]}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <input
                        type="hidden"
                        name="description"
                        value={JSON.stringify(json)}
                    />
                    <Label>Description</Label>
                    <TipTapEditor json={json} setJson={setJson} />
                    {state?.errors?.["description"]?.[0] && (
                        <p className="text-destructive">
                            {state?.errors?.["description"]?.[0]}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Product Images</Label>
                    <input
                        type="hidden"
                        name="images"
                        value={JSON.stringify(images)}
                    />
                    <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            setImages(res.map((item) => item.url));
                            toast.success("Your images have been uploaded.");
                        }}
                        onUploadError={(error: Error) => {
                            toast.error("Something went wrong. Try again.");
                        }}
                    />
                    {state?.errors?.["images"]?.[0] && (
                        <p className="text-destructive">
                            {state?.errors?.["images"]?.[0]}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Product File</Label>
                    <input
                        type="hidden"
                        name="productFile"
                        value={JSON.stringify(productFile ?? "")}
                    />
                    <UploadDropzone
                        endpoint="productFileUpload"
                        onClientUploadComplete={(res) => {
                            SetProductFile(res[0].url);
                            toast.success("Your zipfile has been uploaded.");
                        }}
                        onUploadError={(error: Error) => {
                            toast.error("Something went wrong. Try again");
                        }}
                    />
                    {state?.errors?.["productFile"]?.[0] && (
                        <p className="text-destructive">
                            {state?.errors?.["productFile"]?.[0]}
                        </p>
                    )}
                </div>
            </CardContent>

            <CardFooter className="mt-5">
                <SubmitButton>Create your product</SubmitButton>
            </CardFooter>
        </form>
    );
};
export default SellForm;
