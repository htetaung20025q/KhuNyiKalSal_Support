import React from 'react';
import Hero from '@/components/sections/landing/Hero';
import MainContent from '@/components/sections/landing/MainContent';
import UseCases from '@/components/sections/landing/UseCases';
import Privacy from '@/components/sections/landing/Privacy';
import CommunityImpact from '@/components/sections/landing/CommunityImpact';

export default function HomePage({ t, onOpenDownload, onOpenFirstAid }) {
  return (
    <main>
      <Hero t={t} onOpenDownload={onOpenDownload} onOpenFirstAid={onOpenFirstAid} />
      <MainContent t={t} />
      <UseCases t={t} />
      <Privacy t={t} />
      {/* <CommunityImpact /> */}
    </main>
  );
}
