'use client';

import dynamic from 'next/dynamic';

const CursorGlow = dynamic(() => import('@/components/CursorGlow'), { ssr: false });
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false });

export default function ClientEffects() {
  return (
    <>
      <CursorGlow />
      <ParticleBackground />
    </>
  );
}
