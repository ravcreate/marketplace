import { Card } from "@/components/ui/card";
import SellForm from "../_components/form/sell-form";
import { checkForStripeConnectLinked } from "@/lib/stripe/stripe-actions";
import { unstable_noStore as noStore } from "next/cache";

/**
 *	Component Starts Here
 */
const SellRoute = async () => {
    noStore();
    const isStripeConnectLinked = await checkForStripeConnectLinked();

    return (
        <section className="max-w-7xl mx-auto py-10 px-4 md:px-8">
            <Card>
                <SellForm />
            </Card>
        </section>
    );
};
export default SellRoute;
