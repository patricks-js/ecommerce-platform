"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

export default function PriceRangeSlider({
  min = 0,
  max = 10000,
  step = 1,
  formatValue = (value: number) => `$${value}`,
}: {
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
}) {
  const [range, setRange] = React.useState([min, max]);

  const handleRangeChange = (newRange: number[]) => {
    setRange(newRange);
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        value={range}
        onValueChange={handleRangeChange}
        min={min}
        max={max}
        step={step}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          aria-label="Minimum price"
        />
        <SliderPrimitive.Thumb
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          aria-label="Maximum price"
        />
      </SliderPrimitive.Root>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{formatValue(range[0])}</span>
        <span>{formatValue(range[1])}</span>
      </div>
    </div>
  );
}
