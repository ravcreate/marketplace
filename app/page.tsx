import Image from "next/image";
import NewestProduct from "./components/newest-product";

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
            <NewestProduct />
        </section>
    );
}
