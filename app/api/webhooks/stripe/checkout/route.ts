import { EmailTemplate } from "@/app/_components/email-template";
import ProductEmail from "@/app/_components/product-email";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe/stripe";
import { headers } from "next/headers";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_CHECKOUT_WEBHOOK_SECRET_KEY as string
        );
    } catch (error: unknown) {
        return new Response("webhook error", { status: 400 });
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            const link = session.metadata?.link;

            const { data, error } = await resend.emails.send({
                from: "Marketplace <onboarding@resend.dev>",
                to: ["ravuthvann@outlook.com"],
                subject: "Your Product from Marketplace",
                react: ProductEmail({
                    link: link as string,
                }) as React.ReactElement,
            });

            break;
        }
        default: {
            console.log("unhandled event");
        }
    }

    return new Response(null, { status: 200 });
}
