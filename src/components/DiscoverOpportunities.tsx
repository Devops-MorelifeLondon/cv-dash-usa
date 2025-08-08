import { useState } from "react";
import { Map, ArrowRight, MessageCircle, Video, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stateInfo = {
  Maharashtra: {
    title: "Maharashtra – India’s Financial Capital",
    keySectors: "Finance, Auto, Life Sciences, Media & Film",
    topCities: "Mumbai, Pune, Nagpur",
    incentives: [
      "Single Window Clearance",
      "Subsidized land for MSMEs",
      "Export-oriented zone schemes"
    ],
    growth: "6.2% annual GSDP growth | $400B+ state GDP",
    why: "Access to ports, top talent, VC ecosystem, and premium infrastructure",
  },
  Gujarat: {
    title: "Gujarat – Industrial & Export Powerhouse",
    keySectors: "Textiles, Gems & Jewelry, Logistics, Chemicals",
    topCities: "Ahmedabad, Surat, Vadodara",
    incentives: [
      "Export subsidies",
      "Ease of Doing Business ranking",
      "Mega industrial zones"
    ],
    growth: "8.3% annual GSDP growth | $250B+ state GDP",
    why: "World-class ports, fast approvals, and low taxes"
  },
  Karnataka: {
    title: "Karnataka – India’s Silicon Valley",
    keySectors: "Aerospace, Electronics, Startups, IT, AI, Biotech",
    topCities: "Bengaluru, Mysuru, Mangaluru",
    incentives: [
      "R&D grants",
      "Ease of Doing Business policies"
    ],
    growth: "7.5% annual GDP growth",
    why: "Tech capital, deep talent pool, R&D-friendly"
  },
  // ... More states as needed
};

const statesList = [
  {
    key: "Maharashtra",
    label: "Maharashtra",
    sectors: "IT & Software, Automotive, Finance",
  },
  {
    key: "Gujarat",
    label: "Gujarat",
    sectors: "Textiles, Gems & Jewelry, Logistics",
  },
  {
    key: "Karnataka",
    label: "Karnataka",
    sectors: "Aerospace, Electronics, Startups",
  },
  // ...add more
];


export default function DiscoverOpportunitiesIndia() {
  const [selectedState, setSelectedState] = useState("Karnataka"); // default selection

  return (
    <div className="p-0 md:p-4 bg-white min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-gradient-to-b from-white/95 via-white/70 to-transparent z-20 pb-4 pt-4 px-4 md:px-8 border-b border-border/30">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <span className="text-primary">Click a State to Explore Opportunities</span>
        </h1>
      </div>

      {/* Main Responsive 2-column Layout */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4 md:mt-8 w-full">
        {/* ----- LEFT PANEL: INTERACTIVE MAP ----- */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <Card className="p-4 md:p-6 bg-cv-blue-light/60 border-primary/20 shadow-card">
            <div className="mb-3 flex gap-2 items-center">
              <Map className="w-6 h-6 text-primary" />
              <span className="font-semibold text-xl">
                Interactive State-wise Opportunities
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Hover over Indian states to discover top sectors, incentives & growth trends.
            </p>
            {/* Mock MAP via Grid, replace with SVG/WebGL */}
            <div className="grid grid-cols-1 gap-3">
              {statesList.map(st => (
                <button
                  key={st.key}
                  className={`rounded-lg p-4 text-left border transition 
                    ${selectedState === st.key ? "bg-primary/20 border-primary shadow" : "hover:bg-primary/10 border-border"}
                  `}
                  onClick={() => setSelectedState(st.key)}
                >
                  <div className="font-bold text-base mb-1">
                    {st.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {st.sectors}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* ----- RIGHT PANEL: STATE INFO, BIZ MATCH, STORIES ----- */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          {/* DYNAMIC INFO PANEL */}
          <Card className="p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-1">{stateInfo[selectedState]?.title ?? "Select a State"}</h2>
            <ul className="mb-2 text-sm">
              <li>
                <span className="font-semibold text-primary">Key Sectors:</span>{" "}
                {stateInfo[selectedState]?.keySectors}
              </li>
              <li>
                <span className="font-semibold text-primary">Top Cities:</span>{" "}
                {stateInfo[selectedState]?.topCities}
              </li>
              <li>
                <span className="font-semibold text-primary">Investment Incentives:</span>{" "}
                {stateInfo[selectedState]?.incentives && (
                  <ul className="list-disc ml-6">
                    {stateInfo[selectedState].incentives.map((str, idx) =>
                      <li key={idx}>{str}</li>
                    )}
                  </ul>
                )}
              </li>
              <li>
                <span className="font-semibold text-primary">Growth Snapshot:</span>{" "}
                {stateInfo[selectedState]?.growth}
              </li>
            </ul>
            <Badge className="bg-primary/10 border border-primary/20 text-primary mb-2">
              Why set up here? {stateInfo[selectedState]?.why}
            </Badge>
          </Card>

          {/* BUSINESS IDEA GENERATOR */}
          <Card className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold">🎮 Find Your Business Match</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Answer a few quick questions and we’ll suggest 3 best-fit business ideas for India.
            </p>
            <Button className="w-full" variant="outline">
              Take the Quiz <ArrowRight className="inline-block ml-2 w-4 h-4" />
            </Button>
            <Badge className="bg-blue-50 border border-blue-300 text-blue-700 w-fit">
              88% Match Accuracy
            </Badge>
          </Card>

          {/* PLAYBOOKS / SUCCESS STORIES */}
          <Card className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Video className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold">📚 Follow Proven Playbooks</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Learn from real success stories and expert business playbooks—step-by-step journeys of entrepreneurs who expanded in India.
            </p>
            <Button className="w-full" variant="outline">
              Discover Success Stories <ArrowRight className="inline-block ml-2 w-4 h-4" />
            </Button>
          </Card>
        </div>
      </div>

      {/* ---- Bottom Section ---- */}
      <div className="mt-8 flex flex-col md:flex-row gap-4 md:gap-8 w-full">
        <Card className="flex-1 p-5 flex flex-col sm:flex-row items-center justify-between gap-6 bg-cv-blue-light/20 shadow-card border-primary/10">
          <div>
            <div className="font-bold text-lg mb-1">Still have questions?</div>
            <p className="text-sm text-muted-foreground mb-1">
              Get instant AI-powered help or book a personal strategy session with our experts.
            </p>
            <div className="flex gap-3 mt-3 flex-col sm:flex-row">
              <Button variant="outline" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> Ask CrossAssist
              </Button>
              <Button className="bg-primary text-white flex items-center gap-2">
                Book Your Strategy Call <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
