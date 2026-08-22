import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/home/HeroSection';
import LatestRelease from '@/components/home/LatestRelease';
import FeaturedAlbum from '@/components/home/FeaturedAlbum';
import SpotifySection from '@/components/home/SpotifySection';
import FlipCards from '@/components/home/FlipCards';
import ArtistSpotlight from '@/components/home/ArtistSpotlight';
import SocialSection from '@/components/home/SocialSection';
import QuickLinks from '@/components/home/QuickLinks';
import BrandCollaborators from '@/components/home/BrandCollaborators';

const sectionVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 6, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen space-y-4" style={{ perspective: 1200 }}>
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Latest Release 4K Video */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <LatestRelease />
      </motion.div>

      {/* 3. Featured Album Tracklist */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <FeaturedAlbum />
      </motion.div>

      {/* 4. 3D Vinyl Turntable & Streaming */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <SpotifySection />
      </motion.div>

      {/* 5. 3D FlipCards */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <FlipCards />
      </motion.div>

      {/* 6. Artist Spotlight */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <ArtistSpotlight />
      </motion.div>

      {/* 7. Social Media Live Activity */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <SocialSection />
      </motion.div>

      {/* 8. Quick Links */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <QuickLinks />
      </motion.div>

      {/* 9. Brand Collaborators */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <BrandCollaborators />
      </motion.div>

    </div>
  );
}