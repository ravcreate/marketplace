import {
    createdStripeAccountLink,
    getStripeConnectedData,
    getStripeDashboardLink,
} from "@/lib/stripe/stripe-actions";
import { getCurrentUser } from "@/lib/actions";

import { SubmitButton } from "../_components/submit-button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { unstable_noStore as noStore } from "next/cache";

const Billing = async () => {
    noStore();
    const user = await getCurrentUser();
    const isStripeConnectLinked = await getStripeConnectedData();

    return (
        <section>
            <Card>
                <CardHeader>
                    <CardTitle>Billing</CardTitle>
                    <CardDescription>
                        Find all your details regarding your payments.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!!isStripeConnectLinked === false && (
                        <form action={createdStripeAccountLink}>
                            <SubmitButton className="w-[250px]">
                                Link your Account to Stripe
                            </SubmitButton>
                        </form>
                    )}

                    {!!isStripeConnectLinked === true && (
                        <form action={getStripeDashboardLink}>
                            <SubmitButton className="w-[250px]">
                                View Dashboard
                            </SubmitButton>
                        </form>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default Billing;
