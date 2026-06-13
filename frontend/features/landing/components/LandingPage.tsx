import AudienceSection from "@/features/landing/components/AudienceSection";
import FAQSection from "@/features/landing/components/FAQSection";
import HeroSection from "@/features/landing/components/HeroSection";
import HowItWorksSection from "@/features/landing/components/HowItWorksSection";
import ProblemSection from "@/features/landing/components/ProblemSection";
import ScrollRevealController from "@/features/landing/components/ScrollRevealController";
import ServiceCategoriesSection from "@/features/landing/components/ServiceCategoriesSection";
import SolutionSection from "@/features/landing/components/SolutionSection";
import SurveyForm from "@/features/landing/components/SurveyForm";

export default function LandingPage() {
  return (
    <>
      <ScrollRevealController />
      <HeroSection />
      <div id="why-workbridge">
        <AudienceSection />
        <ProblemSection />
      </div>
      <SolutionSection />
      <HowItWorksSection />
      <div id="services">
        <ServiceCategoriesSection />
      </div>
      <SurveyForm />
      <div id="faq">
        <FAQSection />
      </div>
    </>
  );
}
