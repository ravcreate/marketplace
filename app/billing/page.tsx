import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    createdStripeAccountLink,
    getCurrentUser,
    getStripeConnectedData,
} from "@/lib/actions";
import { SubmitButton } from "../_components/submit-button";

const Billing = async () => {
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
                </CardContent>
            </Card>
        </section>
    );
};

export default Billing;
