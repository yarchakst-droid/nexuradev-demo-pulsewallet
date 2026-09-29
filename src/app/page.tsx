import AppPreviewSection from "@/components/preview/AppPreviewSection";
import AudienceSection from "@/components/audience/AudienceSection";
import CardShowcaseSection from "@/components/cards/CardShowcaseSection";
import FeaturesSection from "@/components/features/FeaturesSection";
import Hero from "@/components/hero/Hero";
import WaitlistSection from "@/components/waitlist/WaitlistSection";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <CardShowcaseSection />
      <AppPreviewSection />
      <AudienceSection />
      <WaitlistSection />
    </div>
  );
}
