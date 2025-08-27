"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee, Palette, Cpu } from "lucide-react"; // import the icons you need
import { motion, AnimatePresence } from "framer-motion";


type Product = {
  name: string;
  icon: JSX.Element;
  margin: string;
  regulation: string;
  sourcing: string;
};

const products: Product[] = [
  { name: "Spices", icon: <Coffee />, margin: "4x margin", regulation: "FDA required", sourcing: "Source from India" },
  { name: "Handicrafts", icon: <Palette />, margin: "3x margin", regulation: "No FDA", sourcing: "Artisan suppliers" },
  { name: "Supplements", icon: <Cpu />, margin: "5x margin", regulation: "FDA required", sourcing: "Manufacturers in India" },
];

export default function TopUSProducts() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % products.length);
  const prev = () => setIndex((prev) => (prev - 1 + products.length) % products.length);

  const current = products[index];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-primary">What’s Hot in the U.S. Market?</h2>

      <div className="relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-6 bg-gradient-primary text-primary-foreground shadow-card p-6 rounded-xl shadow-lg w-full"
          >
            <div className="text-6xl">{current.icon}</div>
            <div className="flex-1 text-white">
              <h3 className="font-bold text-xl mb-2">{current.name}</h3>
              <p>Margin Insight: <strong>{current.margin}</strong></p>
              <p>Regulatory: <strong>{current.regulation}</strong></p>
              <p>Sourcing Tip: <strong>{current.sourcing}</strong></p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 mt-6 justify-center">
        <Button onClick={prev} variant="outline">
          ← Prev
        </Button>
        <Button onClick={next} variant="outline">
          Next →
        </Button>
      </div>

      <Button className="mt-6 w-full flex justify-center" variant="outline">
        See Full List <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
}
