import { DashboardLayout } from "@/components/DashboardLayout";
import IndiaMarketEntryPricing from "./Pricing";
import IndiaEntryPackages from "@/components/BundlePackage";




const PricingLayout = () => {
  return (
    <DashboardLayout>
      <IndiaMarketEntryPricing />
       <IndiaEntryPackages/>
    </DashboardLayout>
  );
};

export default PricingLayout;