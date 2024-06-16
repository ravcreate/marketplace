import ProductCard from "@/app/_components/product-card";
import { getCategory } from "@/lib/actions";
import { unstable_noStore as noStore } from "next/cache";

const CategoryPage = async ({ params }: { params: { category: string } }) => {
    noStore();
    const data = await getCategory(params.category);
    return (
        <section className="max-w-7xl mx-auto px-4 py-10 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
                {data.map((product) => (
                    <ProductCard
                        key={product.id}
                        images={product.images}
                        price={product.price}
                        name={product.name}
                        id={product.id}
                        smallDescription={product.smallDescription}
                    />
                ))}
            </div>
        </section>
    );
};
export default CategoryPage;
