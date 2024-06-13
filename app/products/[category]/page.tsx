import ProductCard from "@/app/components/product-card";
import { getCategory } from "@/lib/actions";

const CategoryPage = async ({ params }: { params: { category: string } }) => {
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
