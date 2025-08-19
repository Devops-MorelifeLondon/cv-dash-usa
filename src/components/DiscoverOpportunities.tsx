"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, ArrowRight, Video, Brain, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type StateData = {
  title: string;
  about: string;
  keySectors: string;
  cities: string[];
  incentives: string;
  snapshot: string;
  fact: string;
};

const stateInfo: Record<string, StateData> = {
  Maharashtra: {
    title: "Maharashtra – India’s Financial Capital",
    about: "Maharashtra is India’s financial hub with strong presence in finance, auto and entertainment industries.",
    keySectors: "Finance, Auto, Life Sciences, Media & Film",
    cities: ["Mumbai", "Pune", "Nagpur"],
    incentives: "Tax benefits for IT parks, Startup subsidies, Special economic zones",
    snapshot: "Contributes ~14% to India’s GDP, largest GSDP among Indian states",
    fact: "Mumbai houses both NSE & BSE making it India’s Wall Street",
  },
  Gujarat: {
    title: "Gujarat – Industrial & Export Powerhouse",
    about: "Known for its pro-business policies and robust infrastructure.",
    keySectors: "Textiles, Gems & Jewelry, Logistics",
    cities: ["Ahmedabad", "Surat", "Vadodara"],
    incentives: "Lowest electricity duty for industries, plug-and-play industrial estates",
    snapshot: "Leader in exports, accounts for 33% of India’s cotton production",
    fact: "World’s largest oil refinery is in Jamnagar, Gujarat",
  },
  Karnataka: {
    title: "Karnataka – India’s Silicon Valley",
    about: "Home to India’s tech hub Bengaluru, strong in aerospace and startups.",
    keySectors: "Aerospace, Electronics, Startups",
    cities: ["Bengaluru", "Mysuru", "Mangaluru"],
    incentives: "Startup-friendly policies, R&D support, IT parks",
    snapshot: "Over 40% of India’s IT exports come from Karnataka",
    fact: "Bengaluru is called the Startup Capital of India",
  },
};

export default function DiscoverOpportunitiesIndia() {
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const displayInfo =
    hoveredItem && !hoveredItem.startsWith("City:")
      ? stateInfo[hoveredItem]
      : hoveredItem && selectedState
      ? {
          title: hoveredItem.replace("City:", ""),
          about: `Key business city in ${selectedState}, offering opportunities in ${stateInfo[selectedState].keySectors}.`,
          keySectors: stateInfo[selectedState].keySectors,
          cities: [],
          incentives: stateInfo[selectedState].incentives,
          snapshot: stateInfo[selectedState].snapshot,
          fact: stateInfo[selectedState].fact,
        }
      : selectedState
      ? stateInfo[selectedState]
      : null;

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 z-20 pb-4 border-b">
        <h1 className="text-2xl md:text-xl font-bold text-primary">
          Hover on State/City from Dropdown to Explore Opportunities
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-6 w-full">
        {/* LEFT PANEL */}
        <div className="w-full md:w-1/3">
          <Card className="p-4 md:p-6 bg-cv-blue-light/60 border-primary/20 shadow-card">
            <div className="mb-3 flex gap-2 items-center">
              <Map className="w-6 h-6 text-primary" />
              <span className="font-semibold text-xl">Select State & City</span>
            </div>

            {/* State Dropdown */}
            <div className="relative mb-4">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setOpenState((prev) => !prev)}
              >
                {selectedState || "Select State"}
                <ChevronDown className="w-4 h-4" />
              </Button>
              <AnimatePresence>
                {openState && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-30 mt-2 w-full bg-white border rounded-lg shadow-lg"
                  >
                    {Object.keys(stateInfo).map((st) => (
                      <div
                        key={st}
                        className={`px-4 py-2 cursor-pointer flex items-center justify-between ${
                          selectedState === st ? "bg-primary/20 font-semibold" : "hover:bg-primary/10"
                        }`}
                        onMouseEnter={() => setHoveredItem(st)}
                        onClick={() => {
                          setSelectedState(st);
                          setSelectedCity(null);
                          setOpenState(false);
                        }}
                      >
                        {st}
                        {selectedState === st && <Check className="w-4 h-4 text-primary" />}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* City Dropdown */}
            {selectedState && (
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setOpenCity((prev) => !prev)}
                >
                  {selectedCity || "Select City"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <AnimatePresence>
                  {openCity && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-30 mt-2 w-full bg-white border rounded-lg shadow-lg"
                    >
                      {stateInfo[selectedState].cities.map((city) => (
                        <div
                          key={city}
                          className={`px-4 py-2 cursor-pointer flex items-center justify-between ${
                            selectedCity === city ? "bg-primary/20 font-semibold" : "hover:bg-primary/10"
                          }`}
                          onMouseEnter={() => setHoveredItem("City:" + city)}
                          onClick={() => {
                            setSelectedCity(city);
                            setOpenCity(false);
                          }}
                        >
                          {city}
                          {selectedCity === city && <Check className="w-4 h-4 text-primary" />}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </Card>
        </div>

        {/* ----- RIGHT PANEL ----- */}
        {/* ----- RIGHT PANEL ----- */}
<div className="w-full md:w-2/3 flex flex-col gap-6">
<AnimatePresence mode="wait">
  {displayInfo ? (
    <motion.div
      key={displayInfo.title}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
    <Card className="p-6 shadow-xl">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">{displayInfo.title}</h2>
            <p className="text-muted-foreground">{displayInfo.about}</p>
            <div>
              <h4 className="font-semibold">Key Sectors</h4>
              <p>{displayInfo.keySectors}</p>
            </div>
            {displayInfo.cities.length > 0 && (
              <div>
                <h4 className="font-semibold">Top Cities</h4>
                <p>{displayInfo.cities.join(", ")}</p>
              </div>
            )}
            <div>
              <h4 className="font-semibold">Investment Incentives</h4>
              <p>{displayInfo.incentives}</p>
            </div>
            <div>
              <h4 className="font-semibold">Growth Snapshot</h4>
              <p>{displayInfo.snapshot}</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
              <strong>Fact:</strong> {displayInfo.fact}
            </div>
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
          Hover or select from dropdown options to see details
        </p>
      </Card>
    </motion.div>
  )}
</AnimatePresence>

</div>
      </div>

      {/* BIG BUSINESS MATCH CENTERPIECE */}
      <div className="mt-12 flex justify-center">
        <Card className="p-12 w-full md:w-3/4 text-center shadow-2xl  bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
          <div className="flex flex-col items-center gap-6">
            <Brain className="w-14 h-14 text-primary" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
              🚀 Find Your Business Match
            </h2>
            <p className="text-muted-foreground text-lg">
              Answer a few quick questions and we’ll suggest <br />
              <strong className="text-primary">3 best-fit business ideas</strong> for India.
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

      {/* Stories */}
      <div className="mt-10">
        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Video className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold">📚 Proven Playbooks</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            Learn from real success stories and expert playbooks—step-by-step journeys of entrepreneurs who expanded in India.
          </p>
          <Button className="w-full" variant="outline">
            Discover Success Stories <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
