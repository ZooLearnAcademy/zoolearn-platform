"use client";

import React, { useState } from "react";

const routineStages = [
  {
    id: 1,
    name: "Morning Warming",
    time: "06:00 AM",
    activity: "Solar Basking",
    details:
      "As the sun rises, the mob emerges from the subterranean burrow. Cold from the freezing desert night, they stand tall on their hind legs facing the sun to expose their dark belly patches and absorb solar warmth.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783851827/for_4th_page01_j2wmsy.jpg",
  },
  {
    id: 2,
    name: "Morning Foraging Run",
    time: "08:00 AM",
    activity: "Digging & Lookout Duty",
    details:
      "With bodies warmed, the mob travels to their foraging grounds. Foragers search for beetles and scorpions, while the designated sentinel climbs a high rock to keep watch for hawks, eagles, and jackals.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783852390/for_4th_page02_yywyae.jpg",
  },
  {
    id: 3,
    name: "Midday Heat Retreat",
    time: "12:00 PM",
    activity: "Burrow Rest & Grooming",
    details:
      "When the Kalahari sun reaches its scorching peak, foraging becomes too hot. The mob retreats underground into their elaborate, cool tunnel systems, spending the midday hours grooming, sleeping, and bonding.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783852525/for_4thpage_03_duw5mr.webp",
  },
  {
    id: 4,
    name: "Afternoon Hunting & School",
    time: "03:00 PM",
    activity: "Pup Mentorship & Foraging",
    details:
      "As temperatures cool, the meerkats return above ground. Foraging resumes, and this is the prime time for mentors to teach pups how to safely hunt and handle venomous prey like scorpions.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783851817/4thpage04_kum353.jpg",
  },
  {
    id: 5,
    name: "Evening Burrow Lock-in",
    time: "06:30 PM",
    activity: "Securing the Den",
    details:
      "Before dusk settles, the mob returns to their nesting burrow. After a final scan of the sky by the sentinel, the entire clan descends deep underground, piling together in a cuddle puddle to conserve heat for the cold night ahead.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783845257/meerkat_new10_ppvzzp.jpg",
  },
];

export default function DailyRoutine() {
  const [activeStage, setActiveStage] = useState(0);
  const [prevStage, setPrevStage] = useState(0);

  const handleStageChange = (index: number) => {
    setPrevStage(activeStage);
    setActiveStage(index);
  };

  return (
    <div className="meer-routine-section">
      <div className="meer-section-box">
        <h3 className="meer-section-title">A Day in the Life: Interactive Daily Routine</h3>
        <p className="meer-section-text">
          Meerkats follow a highly structured daily schedule driven by temperature, sun position, and collective safety.
          Click the timeline stages below to witness the hourly routine of a Kalahari mob.
        </p>
      </div>

      <div className="meer-routine-interactive">
        {/* Main Display */}
        <div className="meer-routine-main-view">
          {routineStages.map((stage, index) => {
            let slideClass = "meer-routine-slide";
            if (index === activeStage) slideClass += " active";
            else if (index === prevStage) slideClass += " previous";

            // Determine wipe direction
            if (index === activeStage && activeStage > prevStage) slideClass += " wipe-forward";
            if (index === activeStage && activeStage < prevStage) slideClass += " wipe-backward";

            return (
              <div key={stage.id} className={slideClass}>
                <img src={stage.image} alt={stage.name} />
                <div className="meer-routine-overlay">
                  <div className="meer-routine-data-box">
                    <div className="meer-routine-era">{stage.time}</div>
                    <h4>{stage.name}</h4>
                    <p>{stage.details}</p>
                    <div className="meer-routine-stats">
                      <div className="meer-routine-stat">
                        <span className="stat-icon">🐾</span>
                        <div className="stat-info">
                          <strong>Core Activity</strong>
                          <span>{stage.activity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Controls */}
        <div className="meer-routine-timeline-controls">
          <div className="meer-routine-progress-track">
            <div
              className="meer-routine-progress-fill"
              style={{ width: `${(activeStage / (routineStages.length - 1)) * 100}%` }}
            ></div>
          </div>

          <div className="meer-routine-steps">
            {routineStages.map((stage, index) => (
              <button
                key={stage.id}
                className={`meer-routine-step-btn ${index <= activeStage ? "completed" : ""} ${index === activeStage ? "active" : ""}`}
                onClick={() => handleStageChange(index)}
              >
                <div className="meer-routine-step-dot"></div>
                <div className="meer-routine-step-label">{stage.time}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
