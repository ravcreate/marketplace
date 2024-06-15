import { ProductLoadingCard } from "@/app/_components/product-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFile() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-10 md:px-8">
            <div className="w-full grid grid-cols-1 mt-4 sm:grid-cols-2 gap-10 lg:grid-cols-3">
                <ProductLoadingCard />
                <ProductLoadingCard />
                <ProductLoadingCard />
                <ProductLoadingCard />
                <ProductLoadingCard />
                <ProductLoadingCard />
            </div>
        </section>
    );
}
