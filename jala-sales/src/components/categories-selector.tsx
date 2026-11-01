"use client";

import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

const categories = [
  { id: "earbuds", label: "Earbuds" },
  { id: "headphones", label: "Headphones" },
  { id: "headsets", label: "Headsets" },
  { id: "keyboards", label: "Keyboards" },
  { id: "mouses", label: "Mouses" },
  { id: "monitors", label: "Monitors" },
];

export function CategoriesSelector() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) => {
      if (checked) {
        return [...prev, category.toLowerCase()];
      }

      return prev.filter((c) => c !== category.toLowerCase());
    });
  };

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center space-x-2">
          <Checkbox
            id={category.id}
            checked={selectedCategories.includes(category.id.toLowerCase())}
            onCheckedChange={(checked) =>
              handleCategoryChange(category.id, checked as boolean)
            }
          />
          <label
            htmlFor={category.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {category.label}
          </label>
        </div>
      ))}
    </div>
  );
}
