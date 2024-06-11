"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { productSchema, Product, State } from "./type";
import prisma from "./db";
import { CategoryTypes } from "@prisma/client";

export async function getCurrentUser() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        throw new Error("Something went wrong");
    }

    return user;
}

export async function sellProduct(prevState: any, formData: FormData) {
    const user = await getCurrentUser();

    console.log("FormData :", formData);

    const validateFields = productSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        smallDescription: formData.get("smallDescription"),
        description: formData.get("description"),
        images: JSON.parse(formData.get("images") as string),
        productFile: formData.get("productFile"),
    });

    if (!validateFields.success) {
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Form is invalid",
        };

        return state;
    }

    await prisma.product.create({
        data: {
            name: validateFields.data.name,
            category: validateFields.data.category as CategoryTypes,
            smallDescription: validateFields.data.smallDescription,
            price: validateFields.data.price,
            images: validateFields.data.images,
            productFile: validateFields.data.productFile,
            userId: user.id,
            description: JSON.parse(validateFields.data.description),
        },
    });

    const state: State = {
        status: "success",
        message: "Your Product has been created!",
    };

    return state;
}
