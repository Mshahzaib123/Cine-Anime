"use client";

import CategoriesSection from "./home-page/categories-section";
import HeroSection from "./home-page/hero-section";
import PopularSection from "./home-page/popular-section";
import RecentAddedSection from "./home-page/recent-added-section";
import TrendingSection from "./home-page/trending-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrendingSection />
      <PopularSection />
      <CategoriesSection />
      <RecentAddedSection />
    </main>
  );
}
