"use client";

import React, { useState } from 'react';
import './HoneyBee.css';

const HoneyBeePage = () => {
  // Simple state to track quiz interaction (optional enhancement)
  const handleQuizAnswer = (isCorrect, message) => {
    alert(message);
  };

  return (
    <div className="page-wrapper">

      {/* Navigation */}
      <section className="honey-hero-banner">
        <div className="honey-hero-container">
          <div className="honey-hero-content">
            <span className="honey-taxonomy-tag">Phylum Arthropoda | Insecta</span>
            <h1 className="honey-hero-title">Honey Bee</h1>
            <p className="honey-hero-subtitle">Apis mellifera</p>

            <div className="honey-taxonomy-grid">
              <div className="honey-tax-item">
                <span className="honey-tax-label">Social Structure</span>
                <span className="honey-tax-value">Eusocial</span>
              </div>
              <div className="honey-tax-item">
                <span className="honey-tax-label">Diet</span>
                <span className="honey-tax-value">Nectar & Pollen</span>
              </div>
              <div className="honey-tax-item">
                <span className="honey-tax-label">Role</span>
                <span className="honey-tax-value">Pollinator</span>
              </div>
            </div>

            <div style={{ marginTop: '2rem', maxWidth: '600px', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--honey-text-secondary)' }}>
              <p>Social insects living in well-organized colonies. Vital for pollination and known for producing honey, wax, and royal jelly.</p>
            </div>
          </div>

          <div className="honey-hero-visual">
            <img
              src="https://res.cloudinary.com/duibfmcw1/image/upload/v1771315768/WhatsApp_Image_2026-02-17_at_13.38.32_wwed7p.jpg"
              alt="Honey Bee"
              className="honey-hero-img"
            />
          </div>
        </div>

        <div
          className="honey-scroll-indicator"
          onClick={() => {
            const content = document.querySelector('.container');
            if (content) content.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="honey-mouse"><div className="honey-wheel"></div></div>
          <div className="honey-arrow-down"></div>
        </div>
      </section>

      <div className="container">

        {/* Introduction Section */}
        <header className="intro-section">
          <h2 className="section-title">INTRODUCTION TO HONEY BEE</h2>
          <ul className="info-list">
            <li>1. Honey bee is a social insect that lives together in a well organized colony.</li>
            <li>2. Each colony functions like a single unit, where every bee has a specific role.</li>
            <li>3. Honey bees are important for pollination, which helps plants reproduce.</li>
            <li>4. They also produce honey, wax, royal jelly, and propolis, which are useful to humans.</li>
          </ul>
        </header>

        {/* Honey Bee Colony Structure */}
        <section className="content-block" style={{ borderTopColor: '#FFD700' }}>
          <h2 className="section-title">HONEY BEE COLONY STRUCTURE</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
            A honey bee colony consists of three types of bees:
          </p>

          <div className="card-grid" style={{ marginTop: '1.5rem' }}>
            {/* Queen Card */}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-img-wrapper">
                    <img
                      src="https://res.cloudinary.com/duibfmcw1/image/upload/v1771313870/WhatsApp_Image_2026-02-17_at_13.01.26_jon4qf.jpg"
                      alt="Queen Bee"
                      className="card-img"
                    />
                  </div>
                  <h3 className="card-front-title">Queen Bee</h3>
                  <span className="tap-hint">Hover/Tap to Flip</span>
                </div>
                <div className="flip-card-back">
                  <h3 style={{ marginBottom: '1rem', color: '#FFD700' }}>Queen Bee</h3>
                  <ul className="back-list">
                    <li>1. The queen bee is the only fertile female in the colony.</li>
                    <li>2. Her main function is laying eggs.</li>
                    <li>3. She can lay both fertilized and unfertilized eggs.</li>
                    <li>4. The queen controls reproduction using stored sperm in a structure called spermatheca.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Worker Card */}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-img-wrapper">
                    <img
                      src="https://res.cloudinary.com/duibfmcw1/image/upload/v1771313870/WhatsApp_Image_2026-02-17_at_13.00.44_myuf1c.jpg"
                      alt="Worker Bee"
                      className="card-img"
                    />
                  </div>
                  <h3 className="card-front-title">Worker Bees</h3>
                  <span className="tap-hint">Hover/Tap to Flip</span>
                </div>
                <div className="flip-card-back">
                  <h3 style={{ marginBottom: '1rem', color: '#FFD700' }}>Worker Bees</h3>
                  <ul className="back-list">
                    <li>1. Worker bees are sterile females.</li>
                    <li>2. They are produced from fertilized eggs.</li>
                    <li>3. Their duties include:
                      <ul style={{ listStyleType: 'circle', paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                        <li>Collecting nectar and pollen</li>
                        <li>Making honey and wax</li>
                        <li>Feeding larvae and queen</li>
                        <li>Cleaning and protecting the hive</li>
                      </ul>
                    </li>
                    <li>4. They do not take part in reproduction.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Drone Card */}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-img-wrapper">
                    <img
                      src="https://res.cloudinary.com/duibfmcw1/image/upload/v1771313874/WhatsApp_Image_2026-02-17_at_13.01.07_eez7i6.jpg"
                      alt="Drone Bee"
                      className="card-img"
                    />
                  </div>
                  <h3 className="card-front-title">Drone Bees</h3>
                  <span className="tap-hint">Hover/Tap to Flip</span>
                </div>
                <div className="flip-card-back">
                  <h3 style={{ marginBottom: '1rem', color: '#FFD700' }}>Drone Bees</h3>
                  <ul className="back-list">
                    <li>1. Drone bees are male bees.</li>
                    <li>2. They develop from unfertilized eggs.</li>
                    <li>3. Their only function is to mate with the queen.</li>
                    <li>4. After mating, drones die.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reproductive System Section */}
        <section className="content-block">
          <span className="tag">Genetics</span>
          <h2 className="section-title">REPRODUCTIVE SYSTEM IN HONEY BEE</h2>
          <ul className="info-list" style={{ marginTop: '1rem' }}>
            <li>1. Honey bees show a haplodiploid system of sex determination.</li>
            <li>
              2. In this system:
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.25rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                <li>Males are haploid (n)</li>
                <li>Females are diploid (2n)</li>
              </ul>
            </li>
            <li>3. The sex of the bee depends on whether the egg is fertilized or not.</li>
          </ul>
        </section>

        {/* Parthenogenesis Section */}
        <section className="content-block">
          <span className="tag">Key Mechanism</span>
          <h2 className="section-title">PARTHENOGENESIS</h2>
          <ul className="info-list" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            <li>1. Parthenogenesis is a type of reproduction where an egg develops without fertilization.</li>
            <li>2. It is common in insects like honey bees, ants, and wasps.</li>
            <li>3. In honey bees, parthenogenesis produces only male bees.</li>
          </ul>

          <h2 className="section-title">PARTHENOGENESIS IN HONEY BEE</h2>
          <ul className="info-list" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            <li>1. The queen bee lays unfertilized eggs intentionally.</li>
            <li>2. These unfertilized eggs develop directly into drones (male bees).</li>
            <li>3. Since there is no fertilization, the offspring has only one set of chromosomes.</li>
            <li>4. Therefore, drone bees are haploid (n).</li>
          </ul>
          <p style={{ fontStyle: 'italic', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
            This specific type of parthenogenesis is called Arrhenotokous parthenogenesis.
          </p>

          <div className="note-box" style={{ background: '#FFFDF0', borderColor: 'var(--primary-gold)', color: '#744210' }}>
            <strong>Easy way to remember</strong>
            <ul style={{ listStyleType: 'none', marginTop: '0.5rem', paddingLeft: 0 }}>
              <li>• Fertilized egg → Female → Diploid (2n)</li>
              <li>• Unfertilized egg → Male → Haploid (n)</li>
            </ul>
          </div>
        </section>

        {/* Difference Section */}
        <section className="content-block" style={{ borderTopColor: '#38B2AC' }}>
          <span className="tag" style={{ background: '#E6FFFA', color: '#285E61' }}>Comparison</span>
          <h2 className="section-title">DIFFERENCE BETWEEN FERTILIZED & UNFERTILIZED EGGS</h2>

          <div className="concept-grid" style={{ marginTop: '1.5rem' }}>
            <div className="concept-card" style={{ borderLeftColor: '#38B2AC' }}>
              <span className="concept-title" style={{ color: '#2C7A7B', fontSize: '1.2rem' }}>Fertilized Eggs:</span>
              <ul className="info-list" style={{ marginTop: '0.5rem' }}>
                <li>These eggs fuse with sperm stored in the queen’s spermatheca.</li>
                <li>They develop into female bees, either workers or a queen.</li>
                <li>Fertilized eggs contain two sets of chromosomes, so they are diploid (2n).</li>
              </ul>
            </div>

            <div className="concept-card" style={{ borderLeftColor: '#D69E2E' }}>
              <span className="concept-title" style={{ color: '#B7791F', fontSize: '1.2rem' }}>Unfertilized Eggs:</span>
              <ul className="info-list" style={{ marginTop: '0.5rem' }}>
                <li>These eggs do not fuse with sperm.</li>
                <li>They develop into male bees called drones.</li>
                <li>Unfertilized eggs have only one set of chromosomes, so they are haploid (n).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Significance Section */}
        <section className="content-block">
          <span className="tag">Significance</span>
          <h2 className="section-title">Why Parthenogenesis Is Important in Honey Bee</h2>
          <ul className="info-list" style={{ marginTop: '1rem' }}>
            <li>Parthenogenesis helps the honey bee colony produce male bees (drones) quickly whenever needed.</li>
            <li>It saves energy, because fertilization is not required for the production of males.</li>
            <li>It helps in maintaining a proper balance between queen, workers, and drones inside the hive.</li>
            <li>By ensuring regular reproduction and mating opportunities, parthenogenesis supports the survival and continuity of the colony.</li>
          </ul>

          <div className="note-box" style={{ marginTop: '2rem' }}>
            💡 <strong>Easy memory line</strong>
            <p style={{ marginTop: '0.5rem' }}>Parthenogenesis = quick males + energy saving + colony survival</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HoneyBeePage;