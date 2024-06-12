import { Card } from "@/components/ui/card";
import { getCurrentUser, getData } from "@/lib/actions";
import SettingsForm from "../components/settings-form";

const SettingsPage = async () => {
    const data = await getData();

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8">
            <SettingsForm
                firstName={data?.firstName as string}
                lastName={data?.lastName as string}
                email={data?.email! as string}
            />
        </section>
    );
};
export default SettingsPage;
