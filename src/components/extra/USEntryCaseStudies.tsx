"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CaseStudy = {
  title: string;
  thumbnail: string;
  startupCost: string;
  timeline: string;
  revenue: string;
};

const caseStudies: CaseStudy[] = [
  { title: "Priya's Amazon Brand", thumbnail: "📦", startupCost: "$5k", timeline: "6 weeks", revenue: "$12k/month" },
  { title: "CA serving 100+ US CPAs", thumbnail: "📊", startupCost: "$3k", timeline: "8 weeks", revenue: "$8k/month" },
];

export default function USEntryCaseStudies() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % caseStudies.length);
  const prev = () => setIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  const current = caseStudies[index];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Video className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Real People, Real U.S. Growth</h2>
      </div>

      <div className="relative flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center bg-gradient-primary text-primary-foreground shadow-card p-6 rounded-xl shadow-lg w-full"
          >
            
            <h3 className="font-bold text-xl mb-2">{current.title}</h3>
            <p>Startup Cost: <strong>{current.startupCost}</strong></p>
            <p>Timeline: <strong>{current.timeline}</strong></p>
            <p>Revenue: <strong>{current.revenue}</strong></p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 mt-4 justify-center">
        <Button onClick={prev} variant="outline">← Prev</Button>
        <Button onClick={next} variant="outline">Next →</Button>
      </div>

      <Button className="mt-4 w-full flex justify-center" variant="outline">
        Watch Their Stories <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
}
