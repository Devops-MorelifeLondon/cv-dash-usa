import { DashboardLayout } from "@/components/DashboardLayout";
import IndiaMarketEntryPricing from "./Pricing";
import PostConsultationServicesPricing from "@/components/PostConsultation";





const PostLayout = () => {
  return (
    <DashboardLayout>
      <PostConsultationServicesPricing />
    </DashboardLayout>
  );
};

export default PostLayout;