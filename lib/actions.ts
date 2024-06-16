"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { productSchema, userSettingsSchema } from "./schema";
import prisma from "./db";
import { Category, Link, State } from "./type";
import { notFound, redirect } from "next/navigation";
import { CategoryTypes } from "@prisma/client";
import { East_Sea_Dokdo } from "next/font/google";
import { stripe } from "./stripe/stripe";

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
    //console.log("FormData :", formData);

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

    const data = await prisma.product.create({
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

    return redirect(`/product/${data.id}`);
}

export async function getUserData() {
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

export async function updateUserSettings(prevState: any, formData: FormData) {
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

export async function getProducts() {
    const data = await prisma.product.findMany({
        select: {
            price: true,
            smallDescription: true,
            category: true,
            name: true,
            id: true,
            images: true,
        },
        take: 4,
        orderBy: {
            createdAt: "desc",
        },
    });

    return data;
}

export async function getProduct(id: string) {
    const data = await prisma.product.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            category: true,
            description: true,
            smallDescription: true,
            name: true,
            images: true,
            price: true,
            createdAt: true,
            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                },
            },
        },
    });
    return data;
}

export async function getCategory(category: string) {
    // dependant upon params
    let input;

    switch (category) {
        case "template": {
            input = "template";
            break;
        }

        case "uikit": {
            input = "uikit";
            break;
        }

        case "icon": {
            input = "icon";
            break;
        }

        case "newest": {
            input = "newest";
            break;
        }

        case " all": {
            input = undefined;
            break;
        }

        default: {
            return notFound();
        }
    }

    if (input === "newest") {
        const data = await prisma.product.findMany({
            select: {
                price: true,
                name: true,
                smallDescription: true,
                id: true,
                images: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return data;
    }

    const data = await prisma.product.findMany({
        where: {
            category: input as CategoryTypes,
        },
        select: {
            id: true,
            images: true,
            smallDescription: true,
            name: true,
            price: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return data;
}

/**
 *	Get Products By Category
 */
export async function getProductsByCategory(
    category: Category,
    itemCount: number
) {
    switch (category) {
        case Category.ICONS: {
            const data = await prisma.product.findMany({
                where: {
                    category: "icon",
                },
                select: {
                    price: true,
                    name: true,
                    smallDescription: true,
                    id: true,
                    images: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: itemCount,
            });

            return {
                data: data,
                title: "Icons",
                path: Link.ICON,
            };
        }

        case Category.NEWEST: {
            const data = await prisma.product.findMany({
                select: {
                    price: true,
                    name: true,
                    smallDescription: true,
                    id: true,
                    images: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: itemCount,
            });

            return {
                data: data,
                title: "Newest Products",
                path: Link.NEWEST,
            };
        }

        case Category.TEMPLATES: {
            const data = await prisma.product.findMany({
                where: {
                    category: "template",
                },
                select: {
                    id: true,
                    price: true,
                    name: true,
                    smallDescription: true,
                    images: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: itemCount,
            });

            return {
                data: data,
                title: "Templates",
                path: Link.TEMPLATE,
            };
        }

        case Category.UIKITS: {
            const data = await prisma.product.findMany({
                where: {
                    category: "uikit",
                },
                select: {
                    id: true,
                    price: true,
                    name: true,
                    smallDescription: true,
                    images: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: itemCount,
            });

            return {
                data: data,
                title: "UIKits",
                path: Link.UIKIT,
            };
        }

        default: {
            return notFound();
        }
    }
}

export async function getUserProducts() {
    const user = await getCurrentUser();
    console.log(user.id);

    const data = await prisma.product.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            price: true,
            name: true,
            smallDescription: true,
            images: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    console.log(data);

    return data;
}

/**
 *	Checks if the user's Stripe Connected is linked.
 */
export async function getStripeConnectedData() {
    const user = await getCurrentUser();

    const data = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            stripeConnectedLinked: true,
        },
    });

    return data?.stripeConnectedLinked;
}

/**
 *	Create a Stripe Account Link for the Stripe Connected User
 */
export async function createdStripeAccountLink() {
    const user = await getCurrentUser();

    const data = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            connectedAccountId: true,
        },
    });

    // returns an account links object
    const accountLink = await stripe.accountLinks.create({
        account: data?.connectedAccountId as string,
        refresh_url: `http://localhost:3000/billing`,
        return_url: `http://localhost:3000/return/${data?.connectedAccountId}`,
        type: "account_onboarding",
    });

    return redirect(accountLink.url);
}

/**
 *	Log into Stripe Dashboard
 */
export async function getStripeDashboardLink() {
    const user = await getCurrentUser();

    const data = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            connectedAccountId: true,
        },
    });

    const loginLink = await stripe.accounts.createLoginLink(
        data?.connectedAccountId as string
    );

    return redirect(loginLink.url);
}

export async function checkForStripeConnectLinked() {
    const user = await getCurrentUser();
    const data = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            stripeConnectedLinked: true,
        },
    });
    if (data?.stripeConnectedLinked === false) {
        return redirect("/billing");
    }
    return null;
}
