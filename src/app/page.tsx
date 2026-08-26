import AppPreviewSection from "@/components/preview/AppPreviewSection";
import AudienceSection from "@/components/audience/AudienceSection";
import FeaturesSection from "@/components/features/FeaturesSection";
import Hero from "@/components/hero/Hero";
import WaitlistSection from "@/components/waitlist/WaitlistSection";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <AppPreviewSection />
      <AudienceSection />
      <WaitlistSection />
    </div>
  );
}
