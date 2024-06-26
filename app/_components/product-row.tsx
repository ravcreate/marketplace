import Link from "next/link";
import { Category } from "@/lib/type";
import { getProductsByCategory } from "@/lib/actions";
import ProductCard, { ProductLoadingCard } from "./product-card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductRow = ({ category }: { category: Category }) => {
    return (
        <section className="mt-12">
            <Suspense fallback={<LoadingState />}>
                <LoadRows category={category} />
            </Suspense>
        </section>
    );
};
export default ProductRow;

const LoadRows = async ({ category }: { category: Category }) => {
    const data = await getProductsByCategory(category, 3);
    return (
        <>
            <div className="md:flex md:items-center md:justify-between">
                <h2 className="text-2xl font-extrabold tracking-tighter mb-4">
                    {data.title}
                </h2>
                <Link
                    href={data.path}
                    className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
                >
                    All Products <span>&rarr;</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10">
                {data.data.map((product) => (
                    <ProductCard
                        images={product.images}
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        smallDescription={product.smallDescription}
                    />
                ))}
            </div>
        </>
    );
};

const LoadingState = () => {
    return (
        <div>
            <Skeleton className="h-8 w-56" />
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
                <ProductLoadingCard />
                <ProductLoadingCard />
                <ProductLoadingCard />
            </div>
        </div>
    );
};
