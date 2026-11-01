"use client";

import { motion, MotionConfig } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Form from "next/form";
import { useRef, useState } from "react";

import { useClickOutside } from "@/hooks/use-click-outside";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.2,
};

export function DynamicSearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  return (
    <MotionConfig transition={transition}>
      <div ref={containerRef}>
        <motion.div
          animate={{
            width: isOpen ? "300px" : "36px",
          }}
          initial={false}
        >
          {!isOpen ? (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(true)}
              aria-label="Search products"
            >
              <Icons.search className="size-5 text-muted-foreground" />
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                aria-label="Back"
              >
                <ArrowLeft className="size-5" />
              </Button>
              <Form action="/products" className="w-full">
                <Input
                  name="name" // * It will be a query param: `/products?name=xxx`
                  placeholder="Search products"
                  className="w-full"
                />
              </Form>
            </div>
          )}
        </motion.div>
      </div>
    </MotionConfig>
  );
}
