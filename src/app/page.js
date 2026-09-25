import Hero from "@/components/sections/Hero";
import Ribbon from "@/components/sections/Ribbon";
import Popular from "@/components/sections/Popular";
import KitchenStory from "@/components/sections/KitchenStory";
import DirectBand from "@/components/sections/DirectBand";
import Menu from "@/components/sections/Menu";
import Reviews from "@/components/sections/Reviews";
import Visit from "@/components/sections/Visit";
import Faq from "@/components/sections/Faq";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Ribbon />
      <Popular />
      <KitchenStory />
      <DirectBand />
      <Menu />
      <Reviews />
      <Visit />
      <Faq />
    </>
  );
}
