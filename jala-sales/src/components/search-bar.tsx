"use client";

import { Input } from "./ui/input";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mb-4">
      <Input
        placeholder="Search product by name..."
        onChange={handleInputChange}
      />
    </div>
  );
}
