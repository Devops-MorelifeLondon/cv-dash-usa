"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, ArrowRight, Brain, ChevronDown, Check, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import USBusinessMatchQuiz from "./extra/USBusinessMatchQuiz";
import TopUSProducts from "./extra/TopUSProducts";
import USEntryCaseStudies from "./extra/USEntryCaseStudies";
import  stateInfo from "../../data/states.json"
import BusinessIdeaGenerator from "./extra/BusinessIdeaGenerator";

// ----- Types -----
type StateData = {
  title: string;
  about: string;
  keySectors: string;
  cities: string[];
  incentives: string;
  taxes: string;
  snapshot: string;
  fact: string;
};

// ----- Data -----


// ----- Main Component -----
export default function DiscoverOpportunitiesUSA() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
     const [quizFinished, setQuizFinished] = useState(false);

  const statesList = Object.keys(stateInfo);

  // Determine what to display based on selection or hover
  const displayInfo = () => {
    // If a city is selected, show city info
    if (selectedCity) {
      return {
        ...stateInfo[selectedState!],
        title: selectedCity,
        about: `Key business city in ${selectedState}, opportunities in ${stateInfo[selectedState!].keySectors}.`,
      };
    }

    // If a state is selected, show state info
    if (selectedState) {
      return stateInfo[selectedState];
    }

    // If hovering over a city, show city preview
    if (hoveredCity && selectedState) {
      return {
        ...stateInfo[selectedState],
        title: hoveredCity,
        about: `Key business city in ${selectedState}, opportunities in ${stateInfo[selectedState].keySectors}.`,
      };
    }

    // If hovering over a state, show state preview
    if (hoveredState) {
      return stateInfo[hoveredState];
    }

    // Default case when nothing is selected or hovered
    return null;
  };

  const currentDisplayInfo = displayInfo();

  return (
   <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 p-4 space-y-8">
      {/* Header */}
      <div className="sticky rounded-sm top-0 bg-gradient-primary z-20 px-4 py-6">
        <h1 className="text-3xl text-white font-bold text-primary">
          Explore USA's State Opportunities
        </h1>
        <p className="text-gray-300 mt-2">
          Hover/click on a state or use dropdowns to view state taxes, business incentives, and top industries.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-6 w-full">
        {/* LEFT PANEL */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <Card className="p-4 md:p-6 bg-blue-50/60 border-blue-300/20 shadow-card">
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <Map className="w-6 h-6 text-primary" />
              Select State & City
            </h2>

            {/* State Dropdown */}
            <div className="relative mt-3">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setOpenState((prev) => !prev)}
              >
                {selectedState || "Select State"}
                <ChevronDown className="w-4 h-4" />
              </Button>
              {openState && (
                <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-30 max-h-60 overflow-y-auto">
                  {statesList.map((st) => (
                    <div
                      key={st}
                      className={`px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-primary/10 ${selectedState === st ? "bg-primary/20 font-semibold" : ""
                        }`}
                      onClick={() => {
                        setSelectedState(st);
                        setSelectedCity(null);
                        setOpenState(false);
                        setHoveredState(null);
                      }}
                      onMouseEnter={() => setHoveredState(st)}
                      onMouseLeave={() => setHoveredState(null)}
                    >
                      {st}
                      {selectedState === st && <Check className="w-4 h-4 text-primary" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* City Dropdown */}
            {selectedState && (
              <div className="relative mt-3">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setOpenCity((prev) => !prev)}
                >
                  {selectedCity || "Select City"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
                {openCity && (
                  <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-30 max-h-60 overflow-y-auto">
                    {stateInfo[selectedState].cities.map((city) => (
                      <div
                        key={city}
                        className="px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-primary/10"
                        onClick={() => {
                          setSelectedCity(city);
                          setOpenCity(false);
                          setHoveredCity(null);
                        }}
                        onMouseEnter={() => setHoveredCity(city)}
                        onMouseLeave={() => setHoveredCity(null)}
                      >
                        {city}
                        {selectedCity === city && <Check className="w-4 h-4 text-primary" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* CTA Button */}
          <Button className="mt-4 w-full py-3 text-lg" size="lg">
            Explore State Map <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <AnimatePresence>
            {currentDisplayInfo ? (
              <motion.div
                key={currentDisplayInfo.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="p-6 shadow-xl">
                  <h2 className="text-xl font-bold text-primary">{currentDisplayInfo.title}</h2>
                  <p className="text-muted-foreground mt-2">{currentDisplayInfo.about}</p>
                  <div className="mt-3">
                    <h4 className="font-semibold">Key Sectors</h4>
                    <p>{currentDisplayInfo.keySectors}</p>
                  </div>
                  {currentDisplayInfo.cities && currentDisplayInfo.cities.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-semibold">Top Cities</h4>
                      <p>{currentDisplayInfo.cities.join(", ")}</p>
                    </div>
                  )}
                  <div className="mt-2">
                    <h4 className="font-semibold">Investment Incentives</h4>
                    <p>{currentDisplayInfo.incentives}</p>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold">Taxes</h4>
                    <p>{currentDisplayInfo.taxes}</p>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold">Growth Snapshot</h4>
                    <p>{currentDisplayInfo.snapshot}</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded mt-2">
                    <strong>Fact:</strong> {currentDisplayInfo.fact}
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6 border-2 border-primary shadow-xl">
                  <p className="text-muted-foreground">
                    Hover or select a state/city to see business opportunities.
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-10">
        {/* Full width quiz */}
        <div className="w-full">
          <USBusinessMatchQuiz  onFinish={() => setQuizFinished(true)} />
        </div>

           {/* ✅ Show this only if quiz is finished */}
   {quizFinished && (
       <BusinessIdeaGenerator/>
      )}

        {/* Side-by-side products and case studies */}
        <div className="flex flex-col justify-center items-center  md:flex-row gap-5">
          <div className="w-full md:w-1/2">
            <TopUSProducts />
          </div>
          <div className="w-full md:w-1/2">
            <USEntryCaseStudies />
          </div>
        </div>
      </div>



   
      {/* Success Stories */}
      <div className="mt-10">
        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Video className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold">📚 Proven Playbooks</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            Learn from real success stories and expert playbooks—step-by-step journeys of entrepreneurs who expanded in the USA.
          </p>
          <Button className="w-full" variant="outline">
            Discover Success Stories <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
}