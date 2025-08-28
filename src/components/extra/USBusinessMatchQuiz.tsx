"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Question = {
  question: string;
  options: string[];
};

const quizQuestions: Question[] = [
  { question: "Capital available?", options: ["<$10k", "$10k-$50k", "$50k-$200k", ">$200k"] },
  { question: "Preferred sector?", options: ["E-commerce", "Manufacturing", "Services", "Tech"] },
  { question: "Location goals?", options: ["East Coast", "West Coast", "Central US", "Flexible"] },
  { question: "Time-to-market?", options: ["<1 month", "1-3 months", "3-6 months", ">6 months"] },
];

const suggestedBusinessTypes = [
  "E-commerce LLC in Delaware",
  "C-Corp SaaS in California",
  "Service Business in Texas",
];

export default function USBusinessMatchQuiz({ onFinish }: { onFinish?: () => void }) {
  const [answers, setAnswers] = useState<number[]>(Array(quizQuestions.length).fill(-1));
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (qIdx: number, optIdx: number) => {
    const newAns = [...answers];
    newAns[qIdx] = optIdx;
    setAnswers(newAns);
  };

 
  const nextStep = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
      if (onFinish) onFinish(); // 🔥 tell parent quiz is finished
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl w-full  mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">Take the U.S. Entry Idea Quiz 🚀</h2>

      {/* Progress Bar */}
      <div className="w-full bg-blue-200 rounded-full h-2 mb-6">
        <motion.div
          className="bg-primary h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              <p className="font-semibold text-lg">{quizQuestions[currentStep].question}</p>
              <div className="flex flex-wrap gap-3">
                {quizQuestions[currentStep].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect(currentStep, idx)}
                    className={`px-4 py-2 rounded-lg border ${
                      answers[currentStep] === idx
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-primary/30 hover:bg-primary/10"
                    } transition-colors`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between mt-4">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={prevStep}>
                    ← Previous
                  </Button>
                )}
                <Button onClick={nextStep} className="ml-auto flex items-center gap-2">
                  {currentStep < quizQuestions.length - 1 ? "Next" : "See Results"} <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h3 className="font-bold text-xl text-primary">Your Top 3 Business Matches:</h3>
            <ul className="list-disc list-inside space-y-1">
              {suggestedBusinessTypes.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Compliance Fit: 91% ✅</p>
            <Button size="lg" className="mt-3 flex items-center gap-2">
              Explore Ideas <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
