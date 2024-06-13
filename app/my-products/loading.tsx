import { ProductLoadingCard } from "../components/product-card";

const LoadingFile = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
                <ProductLoadingCard />
                <ProductLoadingCard />
                <ProductLoadingCard />
                <ProductLoadingCard />
                <ProductLoadingCard />
                <ProductLoadingCard />
            </div>
        </div>
    );
};
export default LoadingFile;
