import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

// Extend the window interface to avoid TypeScript errors with the external JotForm script
declare global {
  interface Window {
    jotformEmbedHandler: (selector: string, domain: string) => void;
  }
}

const CrossAssist = () => {
  // Load the JotForm script when the component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/s/umd/b507072b15f/for-form-embed-handler.js";
    script.async = true;
    
    script.onload = () => {
      // Initialize the embed handler once the script is loaded
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-01991427525177ae817d4de358a39b56808e']",
          "https://www.jotform.com"
        );
      }
    };

    document.body.appendChild(script);

    // Cleanup script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const features = [
    { icon: "🇺🇸", title: "USA Market Entry", desc: "LLC formation, state regulations, compliance" },
    { icon: "📦", title: "E-commerce Setup", desc: "Amazon, Shopify, fulfillment strategies" },
    { icon: "📋", title: "Regulatory Guidance", desc: "FDA, licenses, permits, state rules" },
    { icon: "💡", title: "Business Strategy", desc: "Market research, product fit, growth plan" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header / Context Badge */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Morgan: Business Setup Advisor</h2>
        <Badge className="bg-cv-blue-light text-primary gap-1">
          <Sparkles className="w-3 h-3" />
          AI Powered
        </Badge>
      </div>

      {/* JotForm Agent Embed */}
      <Card className="overflow-hidden bg-white border border-border/50 shadow-sm">
        <div className="w-full relative min-h-[700px]">
          <iframe
            id="JotFormIFrame-01991427525177ae817d4de358a39b56808e"
            title="Morgan: USA Business Setup Advisor"
            allow="geolocation; microphone; camera; fullscreen"
            src="https://agent.jotform.com/01991427525177ae817d4de358a39b56808e?embedMode=iframe&background=1&shadow=1"
            style={{
              width: "100%",
              height: "700px", // Set a default height, the script may adjust this
              border: "none",
              maxWidth: "100%",
            }}
            scrolling="no"
          />
        </div>
      </Card>

      {/* What I Can Help With - Context Section */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 text-foreground">
          What Morgan Can Help With
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-transparent hover:border-border transition-colors">
              <div className="w-10 h-10 bg-cv-blue-light rounded-lg flex items-center justify-center text-lg">
                {item.icon}
              </div>
              <div>
                <div className="font-medium text-foreground text-sm">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CrossAssist;