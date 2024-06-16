"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "../actions";
import prisma from "../db";
import { stripe } from "./stripe";

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

/**
 *  Check if Stripe Connect is Linked
 */
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
