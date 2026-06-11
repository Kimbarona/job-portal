import AudienceSection from "@/features/landing/components/AudienceSection";
import FAQSection from "@/features/landing/components/FAQSection";
import HeroSection from "@/features/landing/components/HeroSection";
import HowItWorksSection from "@/features/landing/components/HowItWorksSection";
import ProblemSection from "@/features/landing/components/ProblemSection";
import ServiceCategoriesSection from "@/features/landing/components/ServiceCategoriesSection";
import SolutionSection from "@/features/landing/components/SolutionSection";
import SurveyForm from "@/features/landing/components/SurveyForm";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AudienceSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <ServiceCategoriesSection />
      <SurveyForm />
      <FAQSection />
    </>
  );
}
