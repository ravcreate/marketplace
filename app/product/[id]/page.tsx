import Image from "next/image";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { getProduct } from "@/lib/actions";
import { ProductDescription } from "@/app/_components/product-description";
import { JSONContent } from "@tiptap/react";
import { createCheckoutSessions } from "@/lib/stripe/create-checkout-sessions";
import { SubmitButton } from "@/app/_components/submit-button";
import { unstable_noStore as noStore } from "next/cache";

const ProductPage = async ({ params }: { params: { id: string } }) => {
    noStore();
    const data = await getProduct(params.id);
    const isMultipleImages = data?.images.length! > 1 ? true : false;

    return (
        <section className="max-w-7xl mx-auto px-4 py-10 lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 mt-20 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            <Carousel className="lg:row-end-1 lg:col-span-4">
                <CarouselContent>
                    {data?.images.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                                <Image
                                    src={item as string}
                                    alt="Product Image"
                                    fill
                                    className="object-cover w-full h-full rounded-lg"
                                    sizes="100%"
                                    priority
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {isMultipleImages && (
                    <>
                        <CarouselPrevious className="ml-16" />
                        <CarouselNext className="mr-16" />
                    </>
                )}
            </Carousel>

            <div className="w-full max-w-2xl mx-auto  mt-5 sm:mt-10 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    {data?.name}
                </h1>
                <p className="mt-2 text-muted-foreground">
                    {data?.smallDescription}
                </p>
                <form action={createCheckoutSessions}>
                    <input type="hidden" name="id" value={data?.id} />
                    <SubmitButton size="lg" className="w-full mt-10">
                        Buy for ${data?.price}
                    </SubmitButton>
                </form>
                <div className="border-t border-gray-200 mt-10 pt-10">
                    <div className="grid grid-cols-2 w-full gap-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground col-span-1">
                            Released:
                        </h3>
                        <h3 className="text-sm font-medium col-span-1">
                            {new Intl.DateTimeFormat("en-US", {
                                dateStyle: "long",
                            }).format(data?.createdAt)}
                        </h3>
                        <h3 className="text-sm font-medium text-muted-foreground col-span-1">
                            Category:
                        </h3>
                        <h3 className="text-sm font-medium col-span-1">
                            {data?.category}
                        </h3>
                    </div>
                </div>
                <div className="border-t border-gray-300 mt-10" />
            </div>

            <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
                <ProductDescription
                    content={data?.description as JSONContent}
                />
            </div>
        </section>
    );
};
export default ProductPage;
