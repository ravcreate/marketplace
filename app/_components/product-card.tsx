import Image from "next/image";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface AppProps {
    images: string[];
    name: string;
    price: number;
    smallDescription: string;
    id: string;
}

const ProductCard = ({
    images,
    id,
    price,
    smallDescription,
    name,
}: AppProps) => {
    const isMultipleImages = images.length > 1 ? true : false;

    return (
        <div className="rounded-lg">
            <Carousel className="w-full mx-auto">
                <CarouselContent>
                    {images.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="relative h-[230px]">
                                <Image
                                    alt="Product Image"
                                    src={item}
                                    fill
                                    sizes="100%"
                                    className="object-cover w-full h-full rounded-lg"
                                    priority
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {isMultipleImages && (
                    <>
                        <CarouselPrevious className="ml-14" />
                        <CarouselNext className="mr-14" />
                    </>
                )}
            </Carousel>

            <div className="flex justify-between items-center mt-2">
                <h1 className="font-semibold text-xl">{name}</h1>
                <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-insert ring-primary/10">
                    ${price}
                </h3>
            </div>

            <p className="text-gray-600 line-clamp-2 text-sm mt-2">
                {smallDescription}
            </p>

            <Button asChild className="w-full mt-5">
                <Link href={`/product/${id}`}>Learn More</Link>
            </Button>
        </div>
    );
};

export const ProductLoadingCard = () => {
    return (
        <div className="flex flex-col">
            <Skeleton className="w-full h-[230px] bg-gray-200" />
            <div className="flex flex-col mt-2 gap-y-2">
                <Skeleton className="h-8 bg-gray-200" />
                <Skeleton className="w-full h-6 bg-gray-200" />
            </div>
            <Skeleton className="w-full  h-10 mt-5 bg-gray-200" />
        </div>
    );
};

export default ProductCard;
