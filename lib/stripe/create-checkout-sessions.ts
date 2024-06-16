"use server";

import { redirect } from "next/navigation";
import { stripe } from "./stripe";
import prisma from "../db";

export async function createCheckoutSessions(formData: FormData) {
    const data = await prisma.product.findUnique({
        where: {
            id: formData.get("id") as string,
        },
        select: {
            id: true,
            category: true,
            description: true,
            smallDescription: true,
            name: true,
            images: true,
            price: true,
            productFile: true,
            User: {
                select: {
                    connectedAccountId: true,
                },
            },
        },
    });

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: Math.round((data?.price as number) * 100),
                    product_data: {
                        name: data?.name as string,
                        description: data?.smallDescription,
                        images: data?.images,
                    },
                },

                quantity: 1,
            },
        ],
        metadata: {
            link: data?.productFile as string,
        },
        // commission rate
        payment_intent_data: {
            application_fee_amount:
                // get 10% for the total value as commission
                Math.round((data?.price as number) * 100) * 0.1,
            transfer_data: {
                destination: data?.User?.connectedAccountId as string,
            },
        },
        success_url: "http://localhost:3000/payment/success",
        cancel_url: "http://localhost:3000/payment/cancel",
    });

    return redirect(session.url as string);
}
