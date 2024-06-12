"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { productSchema, userSettingsSchema } from "./schema";
import prisma from "./db";
import { CategoryTypes } from "@prisma/client";
import { State } from "./type";

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

export async function getData() {
    const user = await getCurrentUser();
    const data = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            firstName: true,
            lastName: true,
            email: true,
        },
    });

    return data;
}

export async function UpdateUserSettings(prevState: any, formData: FormData) {
    const user = await getCurrentUser();

    const validateFields = userSettingsSchema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
    });

    if (!validateFields.success) {
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Form is invalid.",
        };

        return state;
    }

    const data = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            firstName: validateFields.data.firstName,
            lastName: validateFields.data.lastName,
        },
    });

    const state: State = {
        status: "success",
        message: "Your settings have been updated",
    };

    return state;
}
