import React from 'react';
import { BadgeCheck, ChefHat, Lightbulb, UserRoundCheck, Wifi, Wand2 } from 'lucide-react';
import HeroSection from '../components/HeroSection.jsx';
import ServiceCard from '../components/ServiceCard.jsx';

const features = [
  ['Fully equipped creative studio', 'A clean, production-ready studio for photo, video, podcast, and content shoots.', BadgeCheck],
  ['Professional lighting setup', 'Flexible lighting foundations that make sessions faster and more polished.', Lightbulb],
  ['Makeup room', 'Dedicated preparation space for talent, stylists, and creators.', Wand2],
  ['Kitchen access', 'Convenient access for longer shoots, food content, and team comfort.', ChefHat],
  ['High-speed WiFi', 'Reliable connectivity for teams, uploads, live review, and remote collaboration.', Wifi],
  ['Basic assistant support', 'Local support to help your booking start smoothly and stay organized.', UserRoundCheck]
];

function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-clay">Studio Features</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Everything you need for a focused production day.</h2>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, description, icon]) => (
            <ServiceCard key={title} title={title} description={description} icon={icon} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
