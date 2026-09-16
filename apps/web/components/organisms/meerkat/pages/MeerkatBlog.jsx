"use client";

import React from 'react';
import '../meerkat.css';
import Nav from '../components/meerkat/Nav';
import LeftNav from '../components/meerkat/LeftNav';
import ScrollProgress from '../components/meerkat/ScrollProgress';
import Aurora from '../components/meerkat/Aurora';
import Hero from '../components/meerkat/Hero';
import Marquee from '../components/meerkat/Marquee';
import WhyDay from '../components/meerkat/WhyDay';
import MeetMeerkat from '../components/meerkat/MeetMeerkat';
import Marvels from '../components/meerkat/Marvels';
import CoatSpecies from '../components/meerkat/CoatSpecies';
import SocialScience from '../components/meerkat/SocialScience';
import Transformation from '../components/meerkat/Transformation';
import Taxonomy from '../components/meerkat/Taxonomy';
import LivingDiversity from '../components/meerkat/LivingDiversity';
import Ancestry from '../components/meerkat/Ancestry';
import Timeline from '../components/meerkat/Timeline';
import Engagement from '../components/meerkat/Engagement';
import Footer from '../components/meerkat/Footer';

export default function MeerkatBlog() {
  return (
    <div className="min-h-screen">
      <Aurora />
      <ScrollProgress />
      <LeftNav />
      <Nav />
      <Hero />
      <Marquee />
      <WhyDay />
      <MeetMeerkat />
      <Marvels />
      <CoatSpecies />
      <SocialScience />
      <Transformation />
      <Taxonomy />
      <LivingDiversity />
      <Ancestry />
      <Timeline />
      <Engagement />
      <Footer />
    </div>
  );
}
