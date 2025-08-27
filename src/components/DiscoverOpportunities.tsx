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
const stateInfo: Record<string, StateData> = {
  Texas: {
    title: "Texas – Business-Friendly Powerhouse",
    about: "Texas is a hub for energy, technology, and manufacturing with no state income tax.",
    keySectors: "Energy, Technology, Manufacturing, Aerospace",
    cities: ["Houston", "Austin", "Dallas"],
    incentives: "R&D tax credits, grants, enterprise zones",
    taxes: "No state income tax, corporate tax 1-8.5%",
    snapshot: "Second-largest US economy, low corporate taxes",
    fact: "Austin is the fastest-growing tech city in the USA",
  },
  California: {
    title: "California – Innovation & Tech Capital",
    about: "California leads in technology, entertainment, and green energy industries.",
    keySectors: "Technology, Entertainment, Clean Energy, Biotech",
    cities: ["San Francisco", "Los Angeles", "San Diego"],
    incentives: "California Competes Tax Credit, R&D incentives",
    taxes: "State income tax 1-13.3%, corporate tax 8.84%",
    snapshot: "Largest state GDP in the US, home to Silicon Valley",
    fact: "Silicon Valley hosts over 2,000 tech companies",
  },
  Florida: {
    title: "Florida – Tourism & Trade Hub",
    about: "Florida offers a business-friendly climate, strong logistics, and tourism-driven economy.",
    keySectors: "Tourism, Logistics, Aerospace, Agriculture",
    cities: ["Miami", "Orlando", "Tampa"],
    incentives: "Enterprise zones, tax exemptions, foreign trade zones",
    taxes: "No state income tax, corporate tax 5.5%",
    snapshot: "Fast-growing population and strong international trade",
    fact: "Miami is a key gateway for US-Latin America trade",
  },
  NewYork: {
    title: "New York – Finance & Commerce Center",
    about: "New York excels in finance, media, and professional services, with strong market access.",
    keySectors: "Finance, Media, Real Estate, Healthcare",
    cities: ["New York City", "Buffalo", "Albany"],
    incentives: "Economic development tax credits, investment incentives",
    taxes: "State income tax 4-10.9%, corporate tax 6.5%",
    snapshot: "NYC is the world's financial capital",
    fact: "Wall Street handles $22 trillion in assets",
  },
};

// ----- Main Component -----
export default function DiscoverOpportunitiesUSA() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

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
    <div className="min-h-screen bg-gray-50 p-4">
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
                      className={`px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-primary/10 ${
                        selectedState === st ? "bg-primary/20 font-semibold" : ""
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
    <USBusinessMatchQuiz />
  </div>

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

      

      {/* Business Match Section */}
      <div className="mt-12 flex justify-center">
        <Card className="p-12 w-full md:w-3/4 text-center shadow-2xl bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
          <div className="flex flex-col items-center gap-6">
            <Brain className="w-14 h-14 text-primary" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
              🚀 Find Your Business Match
            </h2>
            <p className="text-muted-foreground text-lg">
              Answer a few quick questions and we'll suggest <br />
              <strong className="text-primary">3 best-fit business ideas</strong> for the USA.
            </p>
            <Button size="lg" className="px-8 py-4 text-lg rounded-xl shadow-lg">
              Start Business Idea Generator <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <Badge className="bg-blue-50 border border-blue-300 text-blue-700 text-sm px-3 py-1">
              88% Match Accuracy
            </Badge>
          </div>
        </Card>
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