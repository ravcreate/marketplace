import Image from "next/image";
import NewestProduct from "./_components/newest-product";
import ProductRow from "./_components/product-row";
import { Category } from "@/lib/type";

export default function Home() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16 md:px-8">
            <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
                <h1>Find the best Tailwind</h1>
                <h1 className="text-primary">Template & Icons</h1>
                <p className="text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
                    The worlds best marketplace for tempales, icons, and code.
                </p>
            </div>
            <ProductRow category={Category.NEWEST} />
            <ProductRow category={Category.TEMPLATES} />
            <ProductRow category={Category.UIKITS} />
            <ProductRow category={Category.ICONS} />
        </section>
    );
}
