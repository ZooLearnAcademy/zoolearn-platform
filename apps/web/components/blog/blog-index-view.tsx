"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./blog.css";

interface BlogPost {
  id: string;
  slug: string;
  category: string;
  categoryIcon: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  stats: { label: string; value: string }[];
  accentColor: string;
  accentLight: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "giraffe",
    slug: "/blog/giraffe",
    category: "World Giraffe Day",
    categoryIcon: "🦒",
    title: "World Giraffe Day",
    subtitle: "The Tallest Story Ever Told",
    description:
      "Celebrate the longest day of the year with the tallest animal on Earth. Explore 24 million years of evolutionary history, the science behind the iconic neck, four distinct species, and the silent extinction threatening these gentle giants.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697468/zoolearn/lciu7nfitbacw92deppl.png",
    tags: ["Evolution", "Conservation", "Taxonomy", "Africa"],
    stats: [
      { label: "Neck", value: "2.4 m" },
      { label: "Heart", value: "11 kg" },
      { label: "Evolution", value: "24 Mya" },
    ],
    accentColor: "#2f7432",
    accentLight: "rgba(47, 116, 50, 0.12)",
    featured: true,
  },
  {
    id: "meerkat",
    slug: "/blog/meerkat",
    category: "World Meerkat Day",
    categoryIcon: "🐾",
    title: "World Meerkat Day",
    subtitle: "The Social Sentinels of the Desert",
    description:
      "Discover the fascinating social structures, survival strategies, and complex communication of meerkats in the harsh Kalahari Desert environment.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1784024833/meerkat_in_another_page_h2xwi1.jpg",
    tags: ["Behavior", "Social Structure", "Desert", "Mammals"],
    stats: [
      { label: "Weight", value: "731 g" },
      { label: "Lifespan", value: "12 yrs" },
      { label: "Group Size", value: "30" },
    ],
    accentColor: "#d97706",
    accentLight: "rgba(217, 119, 6, 0.12)",
    featured: false,
  },
  {
    id: "horse-evolution",
    slug: "/blog/horse-evolution",
    category: "Evolution",
    categoryIcon: "🐴",
    title: "Evolution of the Horse",
    subtitle: "A 55-Million-Year Evolutionary Journey",
    description:
      "Explore how climate shifts transformed Eohippus from a small forest dweller to the modern, single-toed Equus in our interactive horse evolution blog.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774341098/Equus_ferus_vk3fio.png",
    tags: ["Evolution", "Adaptations", "Equidae", "Fossils"],
    stats: [
      { label: "Toes", value: "4 to 1" },
      { label: "Timeline", value: "55 Mya" },
      { label: "Genera", value: "10+" },
    ],
    accentColor: "#b45309",
    accentLight: "rgba(180, 83, 9, 0.12)",
    featured: false,
  },
];

const comingSoonPosts = [
  {
    id: "elephant",
    icon: "🐘",
    title: "The Memory Keepers",
    desc: "Inside the extraordinary minds of African elephants.",
    tag: "Elephants",
    color: "#475569",
  },
  {
    id: "cheetah",
    icon: "🐆",
    title: "Built for Speed",
    desc: "How natural selection forged the fastest land animal.",
    tag: "Cheetahs",
    color: "#b45309",
  },
  {
    id: "octopus",
    icon: "🐙",
    title: "Nine Brains, Three Hearts",
    desc: "The alien intelligence of cephalopods.",
    tag: "Marine Life",
    color: "#0e7490",
  },
];

export function BlogIndexView() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="bl-page">
      {/* ── HERO ── */}
      <section className="bl-hero">
        <div className="bl-hero-bg-pattern" />
        <div className="bl-hero-container">
          <span className="bl-hero-eyebrow">ZooLearn Academy</span>
          <h1 className="bl-hero-title">
            The <em>Living World</em> Blog
          </h1>
          <p className="bl-hero-subtitle">
            Deep-dive science stories about evolution, behaviour, and the
            incredible biology of animals — told with detail that textbooks
            leave out.
          </p>
          <div className="bl-hero-badges">
            <span className="bl-badge">🧬 Evolution</span>
            <span className="bl-badge">🌍 Conservation</span>
            <span className="bl-badge">🔬 Biology</span>
            <span className="bl-badge">🦁 Wildlife</span>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="bl-content-area">
        {/* ── FEATURED / PUBLISHED BLOGS ── */}
        <section className="bl-section">
          <div className="bl-section-header">
            <h2 className="bl-section-title">
              <span className="bl-section-dot" />
              Published Articles
            </h2>
            <p className="bl-section-meta">
              {blogPosts.length} article{blogPosts.length !== 1 ? "s" : ""} available
            </p>
          </div>

          <div className="bl-posts-grid">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className={`bl-card ${post.featured ? "bl-card--featured" : ""} ${hoveredCard === post.id ? "bl-card--hovered" : ""}`}
                onClick={() => router.push(post.slug)}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image Side */}
                <div className="bl-card-image-wrap">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="bl-card-img"
                    style={post.id === "horse-evolution" ? { objectFit: "contain", padding: "28px" } : {}}
                  />
                  <div className="bl-card-image-overlay" />
                  {post.featured && (
                    <span className="bl-card-featured-badge">⭐ Featured</span>
                  )}
                </div>

                {/* Content Side */}
                <div className="bl-card-body">
                  <div className="bl-card-top">
                    <span
                      className="bl-card-category"
                      style={{ color: post.accentColor, background: post.accentLight }}
                    >
                      {post.categoryIcon} {post.category}
                    </span>
                  </div>

                  <h3 className="bl-card-title">{post.title}</h3>
                  <p className="bl-card-subtitle">{post.subtitle}</p>
                  <p className="bl-card-desc">{post.description}</p>

                  {/* Quick Stats */}
                  <div className="bl-card-stats">
                    {post.stats.map((s, i) => (
                      <div key={i} className="bl-card-stat">
                        <span className="bl-card-stat-val">{s.value}</span>
                        <span className="bl-card-stat-lbl">{s.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="bl-card-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bl-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={post.slug}
                    className="bl-read-btn"
                    style={{ background: post.accentColor, textAlign: "center", textDecoration: "none" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── COMING SOON ── */}
        <section className="bl-section bl-coming-soon-section">
          <div className="bl-section-header">
            <h2 className="bl-section-title">
              <span className="bl-section-dot bl-section-dot--muted" />
              Coming Soon
            </h2>
            <p className="bl-section-meta">More stories in the pipeline</p>
          </div>

          <div className="bl-coming-grid">
            {comingSoonPosts.map((post) => (
              <div key={post.id} className="bl-coming-card">
                <div className="bl-coming-icon-wrap" style={{ background: post.color + "18" }}>
                  <span className="bl-coming-icon">{post.icon}</span>
                </div>
                <div className="bl-coming-body">
                  <span className="bl-coming-tag" style={{ color: post.color }}>
                    {post.tag}
                  </span>
                  <h4 className="bl-coming-title">{post.title}</h4>
                  <p className="bl-coming-desc">{post.desc}</p>
                </div>
                <div className="bl-coming-pill">Soon</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default BlogIndexView;
