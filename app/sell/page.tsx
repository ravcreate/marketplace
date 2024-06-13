import { Card } from "@/components/ui/card";
import SellForm from "../components/form/sell-form";
import { getCurrentUser } from "@/lib/actions";

/**
 *	Component Starts Here
 */
const SellRoute = async () => {
    const user = await getCurrentUser();
    return (
        <section className="max-w-7xl mx-auto py-10 px-4 md:px-8">
            <Card>
                <SellForm />
            </Card>
        </section>
    );
};
export default SellRoute;
