import { ArrowRight } from "lucide-react";
import React from "react";

const stories = [
  { business: "From Salt to Shelf", route: "🇮🇳 → 🇺🇸", achievement: "A bamboo salt manufacturer from India now sells in the U.S." },
  { business: "From Consultant to Company", route: "🇮🇳 → 🇺🇸", achievement: "An IT pro built a U.S. staffing firm." },
  { business: "Code Local. Serve Global.", route: "🇮🇳 → 🇺🇸", achievement: "India-based coding center serving U.S. clients." },
  { business: "From Orchard to Aisle", route: "🇮🇳 → 🇺🇸", achievement: "Mango farmer launches jelly & syrup brand in U.S." },
  { business: "Surat to States", route: "🇮🇳 → 🇺🇸", achievement: "Jewelry brands go D2C in the U.S." },
  { business: "Balancing the Books", route: "🇮🇳 → 🇺🇸", achievement: "Indian accountants serve U.S. firms remotely." },
  { business: "Legal Without Borders", route: "🇮🇳 → 🇺🇸", achievement: "Freelance lawyers and LPOs serve U.S. attorneys." },
  { business: "Air Ticketing Abroad", route: "🇮🇳 → 🇺🇸", achievement: "Travel entrepreneur launches U.S.-based ticketing service." },
  { business: "Leads That Scale", route: "🇮🇳 → 🇺🇸", achievement: "Lead-gen pros start minting from U.S. clients." },
  { business: "Fulfillment Edge", route: "🇮🇳 → 🇺🇸", achievement: "Indian traders use U.S. 3PLs for dropshipping." },
  { business: "Packaging Power", route: "🇮🇳 → 🇺🇸", achievement: "Packaging company sets up warehousing & lumber plant in U.S." },
  { business: "Heavy Metal, Light Borders", route: "🇮🇳 ↔ 🇺🇸", achievement: "HMS 1 & 2 metal traders source from U.S. & supply to India." },
  { business: "Timber Turnaround", route: "🇺🇸 → 🌏", achievement: "Lumber traders distribute U.S. wood across Asia." },
  { business: "From Freelance to Funded", route: "🇮🇳 → 🇺🇸", achievement: "Solo Indian dev turns product into Delaware C-Corp & raises seed capital." },
  { business: "Indian Brand → Amazon USA Hero", route: "🇮🇳 → 🇺🇸", achievement: "Small Indian brands scale via Amazon USA with CrossVentura." },
  { business: "Hyperlocal Hero: Zopho in New Mexico", route: "🇮🇳 → 🇺🇸", achievement: "Inspired by Zepto, Indian entrepreneur launches 10-min grocery delivery in U.S." },
  { business: "Pharma, Global", route: "🇮🇳 → 🇺🇸", achievement: "Indian pharma cos enter U.S. distribution market with regulatory & warehousing support." },
  { business: "Content to Commerce", route: "🇮🇳 → 🇺🇸", achievement: "Indian YouTuber monetizes via U.S. merch store using our infra." },
  { business: "From Incubator to International", route: "🇮🇳 → 🇺🇸", achievement: "Indian SaaS startup expands with CrossVentura’s U.S. toolkit." },
  { business: "Podcast to Profit", route: "🇮🇳 → 🇺🇸", achievement: "India-based podcast studio runs post-production & monetization for U.S. creators." },
  { business: "Legaltech, Born in Mumbai, Serving New York", route: "🇮🇳 → 🇺🇸", achievement: "Legaltech tool runs backend legal workflows for U.S. firms." },
  { business: "Snacks That Travel", route: "🇮🇳 → 🇺🇸", achievement: "Delhi snack brand becomes FDA-compliant & launches on Amazon USA." },
  { business: "NRI-to-India Brand Launch", route: "🇦🇪 → 🇮🇳", achievement: "Dubai investor uses CrossVentura to launch D2C skincare brand in India." },
  { business: "Reverse Expansion: U.S. to India", route: "🇺🇸 → 🇮🇳", achievement: "U.S. brand enters Indian market via Shopify & local warehousing." },
];

// Duplicate for infinite marquee loop
const marqueeStories = [...stories, ...stories];

const SuccessStories = () => {
  return (
    <section className="bg-white py-10 px-4 w-full overflow-hidden">
      {/* Marquee Container */}
      <div className="relative w-full max-w-7xl mx-auto overflow-x-hidden">
        <div
          className="flex flex-nowrap animate-marquee gap-3"
          style={{
            width: `${marqueeStories.length * 420}px`, // Calculate based on item count and width
          }}
        >
          {marqueeStories.map((story, idx) => (
            <div
              key={idx}
              className="flex  items-center flex-shrink-0 mx-3 my-2 rounded-2xl py-2 px-6 border border-[#f3f3f3] w-fit shadow-sm bg-white  transition duration-300"
            >
              <div className="w-full flex justify-between items-center gap-6 mb-1">
                <h3 className="font-semibold text-foreground text-base truncate">
                  {story.business}
                </h3>
                <span className="text-xl">{story.route}</span>
              </div>
           
            </div>
          ))}
        </div>
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default SuccessStories;