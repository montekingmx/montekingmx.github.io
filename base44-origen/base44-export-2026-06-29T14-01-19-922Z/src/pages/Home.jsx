import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedAlbum from '@/components/home/FeaturedAlbum';
import ArtistSpotlight from '@/components/home/ArtistSpotlight';
import QuickLinks from '@/components/home/QuickLinks';
import BrandCollaborators from '@/components/home/BrandCollaborators';
import SpotifySection from '@/components/home/SpotifySection';
import SocialSection from '@/components/home/SocialSection';
import FlipCards from '@/components/home/FlipCards';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedAlbum />
      <SpotifySection />
      <FlipCards />
      <ArtistSpotlight />
      <SocialSection />
      <QuickLinks />
      <BrandCollaborators />
    </div>
  );
}