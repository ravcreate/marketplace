"use client";

import { categoryItems } from "@/app/lib/category-items";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const SelectCategory = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grids-cols-3 gap-8">
            <input
                type="hidden"
                name="category"
                value={selectedCategory || ""}
            />
            {categoryItems.map((item) => (
                <div key={item.id} className="cursor-pointer">
                    <Card
                        className={cn(
                            selectedCategory === item.name
                                ? "border-primary border-2"
                                : "border-2 border-primary/10"
                        )}
                        onClick={() => setSelectedCategory(item.name)}
                    >
                        <CardHeader>
                            {item.image}
                            <h3 className="font-medium">{item.title}</h3>
                        </CardHeader>
                    </Card>
                </div>
            ))}
        </div>
    );
};
