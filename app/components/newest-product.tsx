import { getProducts } from "@/lib/actions";
import Link from "next/link";
import ProductCard from "./product-card";

const NewestProduct = async () => {
    const data = await getProducts();

    return (
        <section className="mt-12">
            <div className="md:flex md:items-center md:justify-between">
                <h2 className="text-2xl font-extrabold tracking-tighter">
                    Newest Products
                </h2>
                <Link
                    href="#"
                    className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
                >
                    All Products <span>&rarr;</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10">
                {data.map((product) => (
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
        </section>
    );
};
export default NewestProduct;
