import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFile() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-20">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10">
                <div className="col-span-1">
                    <Skeleton className="h-[400px] lg:h-[400px] w-full bg-gray-200" />
                    <Skeleton className="h-[300px] w-full mt-10 bg-gray-200" />
                </div>

                <div className="col-span-1">
                    <Skeleton className="w-full h-[400px] bg-gray-200" />
                </div>
            </div>
        </section>
    );
}
