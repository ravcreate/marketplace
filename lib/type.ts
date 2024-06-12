import { productSchema, userSettingsSchema } from "./schema";
import { z } from "zod";

export type State = {
    status: "error" | "success" | undefined;
    errors?: { [key: string]: string[] };
    message?: string | null;
};

export type Product = z.infer<typeof productSchema>;

export type UserSettings = z.infer<typeof userSettingsSchema>;
