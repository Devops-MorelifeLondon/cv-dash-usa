"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, ArrowRight, Brain, ChevronDown, Check, Video, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import USBusinessMatchQuiz from "./USBusinessMatchQuiz";
import TopUSProducts from "./TopUSProducts";
import USEntryCaseStudies from "./USEntryCaseStudies";

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
  industries: string[];
  code: string;
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
    industries: ["Technology", "Energy", "Manufacturing", "Aerospace"],
    code: "TX"
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
    industries: ["Technology", "Entertainment", "Clean Energy", "Biotech"],
    code: "CA"
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
    industries: ["Tourism", "Logistics", "Aerospace", "Agriculture"],
    code: "FL"
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
    industries: ["Finance", "Media", "Real Estate", "Healthcare"],
    code: "NY"
  },
  Illinois: {
    title: "Illinois – Transportation & Business Hub",
    about: "Illinois is a central logistics hub with a diverse economy and skilled workforce.",
    keySectors: "Transportation, Manufacturing, Agriculture, Finance",
    cities: ["Chicago", "Springfield", "Peoria"],
    incentives: "EDGE tax credit, enterprise zones, R&D credits",
    taxes: "State income tax 4.95%, corporate tax 9.5%",
    snapshot: "Chicago is the nation's rail hub and third-largest metro economy",
    fact: "O'Hare Airport is one of the busiest in the world",
    industries: ["Transportation", "Manufacturing", "Agriculture", "Finance"],
    code: "IL"
  },
};

// Industry options for filtering
const industryOptions = [
  "Technology", "Energy", "Manufacturing", "Aerospace", 
  "Entertainment", "Clean Energy", "Biotech", "Tourism", 
  "Logistics", "Agriculture", "Finance", "Media", 
  "Real Estate", "Healthcare", "Transportation"
];

// Simplified SVG paths for some key states (in practice, you'd import a complete SVG map)
const statePaths = [
  { id: "california", name: "California", d: "M100,200 Q120,180 140,190 Q160,200 180,190 Q200,180 220,200 Q240,220 230,240 Q220,260 200,250 Q180,240 160,250 Q140,260 120,240 Q100,220 100,200", code: "CA" },
  { id: "texas", name: "Texas", d: "M300,250 Q320,220 350,230 Q380,240 400,260 Q420,280 410,300 Q400,320 380,330 Q360,340 340,330 Q320,320 310,300 Q300,280 300,250", code: "TX" },
  { id: "florida", name: "Florida", d: "M400,350 Q420,330 440,340 Q460,350 470,370 Q480,390 460,400 Q440,410 420,400 Q400,390 400,370 Q400,350 400,350", code: "FL" },
  { id: "new-york", name: "NewYork", d: "M500,150 Q520,140 540,150 Q560,160 570,180 Q580,200 560,210 Q540,220 520,210 Q500,200 500,180 Q500,160 500,150", code: "NY" },
  { id: "illinois", name: "Illinois", d: "M450,200 Q470,190 490,200 Q510,210 520,230 Q530,250 510,260 Q490,270 470,260 Q450,250 450,230 Q450,210 450,200", code: "IL" },
];

// ----- Main Component -----
export default function DiscoverOpportunitiesUSA() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState<StateData | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const statesList = Object.keys(stateInfo);

  // Update tooltip position to follow cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (tooltipRef.current && tooltipVisible) {
        setTooltipPosition({ 
          x: e.clientX + 10, 
          y: e.clientY + 10 
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [tooltipVisible]);

  // Filter states by selected industry
  const filteredStates = selectedIndustry 
    ? statesList.filter(state => 
        stateInfo[state].industries.includes(selectedIndustry)
      )
    : statesList;

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
    
    // If hovering over a state, show state preview
    if (hoveredState) {
      return stateInfo[hoveredState];
    }
    
    // Default case when nothing is selected or hovered
    return null;
  };

  const currentDisplayInfo = displayInfo();

  // Handle state hover for tooltip
  const handleStateHover = (stateName: string, e: React.MouseEvent) => {
    const stateData = stateInfo[stateName];
    if (stateData) {
      setTooltipContent(stateData);
      setTooltipVisible(true);
      setTooltipPosition({ x: e.clientX + 10, y: e.clientY + 10 });
    }
  };

  const handleStateLeave = () => {
    setTooltipVisible(false);
    setTooltipContent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="sticky rounded-sm top-0 bg-gradient-to-r from-blue-600 to-purple-600 z-20 px-4 py-6 shadow-md">
        <h1 className="text-3xl text-white font-bold">
          Explore USA's State Opportunities
        </h1>
        <p className="text-gray-200 mt-2">
          Hover/click on a state or use filters to view state taxes, business incentives, and top industries.
        </p>
      </div>

      {/* Industry Filter */}
      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-medium">Filter by Industry:</span>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {selectedIndustry ? `Showing: ${selectedIndustry}` : 'All Industries'}
          {selectedIndustry && (
            <X 
              className="w-4 h-4 ml-2" 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndustry(null);
              }} 
            />
          )}
        </Button>
      </div>

      {isFilterOpen && (
        <Card className="mt-2 p-3">
          <div className="flex flex-wrap gap-2">
            {industryOptions.map(industry => (
              <Badge
                key={industry}
                variant={selectedIndustry === industry ? "default" : "outline"}
                className="cursor-pointer px-3 py-1"
                onClick={() => {
                  setSelectedIndustry(selectedIndustry === industry ? null : industry);
                  setIsFilterOpen(false);
                }}
              >
                {industry}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      <div className="flex flex-col lg:flex-row gap-8 mt-6 w-full">
        {/* LEFT PANEL - Map */}
        <div className="w-full lg:w-2/3">
          <Card className="p-4 bg-white border-gray-200 shadow-lg relative overflow-hidden">
            <h2 className="font-semibold text-xl flex items-center gap-2 mb-4">
              <Map className="w-6 h-6 text-primary" />
              US Business Opportunities Map
            </h2>
            
            {/* Interactive SVG Map */}
            <div className="relative w-full h-96 bg-blue-50 rounded-lg border border-gray-200 overflow-hidden">
              <svg 
                viewBox="0 0 800 500" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background pattern for water */}
                <pattern id="water" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                  <rect width="10" height="10" fill="rgba(173, 216, 230, 0.3)" />
                  <rect x="10" y="10" width="10" height="10" fill="rgba(173, 216, 230, 0.3)" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#water)" />
                
                {/* State paths */}
                {statePaths.map(state => {
                  const stateData = Object.values(stateInfo).find(s => s.code === state.code);
                  const isHighlighted = !selectedIndustry || 
                    (stateData && stateData.industries.includes(selectedIndustry));
                  const isSelected = selectedState === state.name;
                  
                  return (
                    <path
                      key={state.id}
                      d={state.d}
                      fill={isSelected ? "#3b82f6" : isHighlighted ? "#93c5fd" : "#d1d5db"}
                      stroke="#fff"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={(e) => {
                        setHoveredState(state.name);
                        handleStateHover(state.name, e);
                      }}
                      onMouseLeave={() => {
                        setHoveredState(null);
                        handleStateLeave();
                      }}
                      onClick={() => setSelectedState(state.name)}
                    />
                  );
                })}

                {/* Animated map pins for highlighted states */}
                {filteredStates.map(stateName => {
                  const statePath = statePaths.find(s => s.name === stateName);
                  if (!statePath) return null;
                  
                  return (
                    <g key={`pin-${statePath.id}`} className="animate-pulse">
                      <circle 
                        cx={getPinPosition(statePath.d).x} 
                        cy={getPinPosition(statePath.d).y} 
                        r="5" 
                        fill="#ef4444" 
                        stroke="#fff" 
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Selected State</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 bg-blue-300 rounded"></div>
                  <span>Available States</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>Filter Match</span>
                </div>
              </div>

              {/* Tooltip */}
              <div
                ref={tooltipRef}
                className={`absolute bg-white p-3 rounded shadow-lg border border-gray-200 z-10 transition-opacity duration-200 ${
                  tooltipVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  left: tooltipPosition.x,
                  top: tooltipPosition.y,
                  maxWidth: '250px'
                }}
              >
                {tooltipContent && (
                  <>
                    <h3 className="font-bold text-blue-600">{tooltipContent.title}</h3>
                    <p className="text-sm mt-1">{tooltipContent.snapshot}</p>
                    <div className="mt-2">
                      <span className="font-semibold">Taxes:</span>
                      <p className="text-sm">{tooltipContent.taxes}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <Button className="mt-4 w-full py-3 text-lg" size="lg">
              Explore Detailed State Map <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </div>

        {/* RIGHT PANEL - Info */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <AnimatePresence>
            {currentDisplayInfo ? (
              <motion.div
                key={currentDisplayInfo.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="p-6 shadow-xl h-full">
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
                <Card className="p-6 border-2 border-dashed border-primary shadow-xl h-full flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                    {selectedIndustry 
                      ? `Hover or select a state to see ${selectedIndustry} opportunities`
                      : "Hover or select a state to see business opportunities"}
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Additional content sections */}
      <div className="flex flex-col gap-6 mt-10">
        {/* Full width quiz */}
        <div className="w-full">
          <USBusinessMatchQuiz />
        </div>

        {/* Side-by-side products and case studies */}
        <div className="flex flex-col md:flex-row gap-5">
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

// Helper function to calculate pin position (simplified)
function getPinPosition(pathData: string) {
  // This is a simplified approach - in a real app, you'd use a proper SVG path parsing library
  const points = pathData.match(/(\d+),(\d+)/g) || [];
  if (points.length > 0) {
    const midPoint = points[Math.floor(points.length / 2)];
    const [x, y] = midPoint.split(',').map(Number);
    return { x, y };
  }
  return { x: 0, y: 0 };
}