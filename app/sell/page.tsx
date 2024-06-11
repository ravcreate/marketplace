import { UploadDropzone } from "../lib/uploadingthing";

import { TipTapEditor } from "../components/editor";

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
import { SelectCategory } from "../components/select-category";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

export default function SellRoute() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8">
            <Card>
                <form>
                    <CardHeader>
                        <CardTitle>Sell your product with ease</CardTitle>
                        <CardDescription>
                            Please describe your product here in details so that
                            it can be sold.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-10">
                        <div className="flex flex-col gap-y-2">
                            <Label>Name</Label>
                            <Input
                                type="text"
                                placeholder="Name of your product"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>
                                <SelectCategory />
                            </Label>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Price</Label>
                            <Input placeholder="$29" type="number" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Small Summary</Label>
                            <Textarea placeholder="Please describe your product shortly right here..." />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Description</Label>
                            <TipTapEditor />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Product Images</Label>
                            <UploadDropzone endpoint="imageUploader" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Product File</Label>
                            <UploadDropzone endpoint="productFileUpload" />
                        </div>
                    </CardContent>

                    <CardFooter className="mt-5">
                        <Button>Submit form</Button>
                    </CardFooter>
                </form>
            </Card>
        </section>
    );
}
