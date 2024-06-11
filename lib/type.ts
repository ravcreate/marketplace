import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";

export const productSchema = z.object({
    name: z
        .string()
        .min(3, { message: "The name has to be a min character length of 5" }),
    category: z.string().min(1, { message: "Category is required" }),
    price: z.number().min(1, { message: "The Price has to be bigger than 1" }),
    smallDescription: z
        .string()
        .min(10, { message: "Please summerize your product more" }),
    description: z.string().min(10, { message: "Description is required" }),
    images: z.array(z.string(), { message: "Images are required" }),
    productFile: z
        .string()
        .min(3, { message: "Please upload a zip of your product" }),
});

export type Product = z.infer<typeof productSchema>;

export type State = {
    status: "error" | "success" | undefined;
    errors?: { [key: string]: string[] };
    message?: string | null;
};
