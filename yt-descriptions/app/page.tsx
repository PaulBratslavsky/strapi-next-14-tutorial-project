import BenefitsSection from "@/components/custom/BenefitsSection";
import HeroSection from "@/components/custom/HeroSection";
import { Fragment } from "react";

export default function HomeRoute() {
  return (
    <Fragment>
      <HeroSection />
      <BenefitsSection />
    </Fragment>
  )
}
