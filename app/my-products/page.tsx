import { getUserProducts } from "@/lib/actions";
import ProductCard from "../_components/product-card";
import { unstable_noStore as noStore } from "next/cache";

const MyProductRoute = async () => {
    noStore();
    const data = await getUserProducts();
    console.log(data);

    return (
        <section className="max-w-7xl py-10 mx-auto px-4 md:px-8">
            <h1 className="text-2xl font-bold">My Products</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-cols-2 mt-4">
                {data.map((item) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        images={item.images}
                        name={item.name}
                        price={item.price}
                        smallDescription={item.smallDescription}
                    />
                ))}
            </div>
        </section>
    );
};
export default MyProductRoute;
