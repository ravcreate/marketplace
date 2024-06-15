import { Card } from "@/components/ui/card";
import { getCurrentUser, getUserData } from "@/lib/actions";
import SettingsForm from "../_components/form/settings-form";

const SettingsPage = async () => {
    const data = await getUserData();

    return (
        <section className="max-w-7xl mx-auto px-4 py-10 md:px-8">
            <SettingsForm
                firstName={data?.firstName as string}
                lastName={data?.lastName as string}
                email={data?.email! as string}
            />
        </section>
    );
};
export default SettingsPage;
