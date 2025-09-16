"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepProps {
  title: string;
  description?: string;
  isActive: boolean;
  isCompleted: boolean;
  isLast: boolean;
  stepNumber: number;
}

const Step = ({
  title,
  description,
  isActive,
  isCompleted,
  isLast,
  stepNumber,
}: StepProps) => {
  return (
    <div className={cn("flex md:block", !isLast && "flex-1")}>
      <div className="flex items-center md:flex-col md:items-center">
        {/* Mobile: Vertical line */}
        <div className="flex flex-col items-center relative">
          {!isLast && (
            <div
              className={cn(
                "absolute top-10 left-1/2 -translate-x-1/2 h-full w-0.5 md:hidden",
                isCompleted ? "bg-primary" : "bg-muted"
              )}
            />
          )}

          {/* Step Circle */}
          <div
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors z-10",
              isCompleted
                ? "bg-primary border-primary text-primary-foreground"
                : isActive
                ? "border-primary text-primary bg-background"
                : "border-muted-foreground text-muted-foreground bg-background"
            )}
          >
            {isCompleted ? (
              <Check className="w-4 h-4" />
            ) : (
              <span className="text-sm font-medium">{stepNumber}</span>
            )}
          </div>
        </div>

        {/* Text Content */}
        <div className="ml-4 md:ml-0 md:mt-2 text-left md:text-center">
          <div
            className={cn(
              "text-sm font-medium",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            {title}
          </div>
          {description && (
            <div className="text-sm text-muted-foreground mt-1">
              {description}
            </div>
          )}
        </div>
      </div>

      {/* Desktop: Horizontal line */}
      {!isLast && (
        <div
          className={cn(
            "flex-1 h-0.5 mx-4 transition-colors hidden md:block mt-4",
            isCompleted ? "bg-primary" : "bg-muted"
          )}
        />
      )}
    </div>
  );
};

interface StepperProps {
  steps: Array<{ title: string; description?: string }>;
  currentStep: number;
  className?: string;
}

export const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-y-8 md:gap-y-0",
        className
      )}
    >
      {steps.map((step, index) => (
        <Step
          key={index}
          title={step.title}
          description={step.description}
          stepNumber={index + 1}
          isActive={index === currentStep}
          isCompleted={index < currentStep}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
};
