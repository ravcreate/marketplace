import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingFile = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <Card>
                <CardHeader className="h-[500px]">
                    <Skeleton className="w-full h-full bg-gray-200" />
                </CardHeader>
            </Card>
        </div>
    );
};
export default LoadingFile;
