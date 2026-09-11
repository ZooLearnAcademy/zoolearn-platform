"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cloudinaryLoader } from "@/lib/cloudinary";
import "./Footer.css";

export function Footer() {
  const [showContact, setShowContact] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowContact(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <footer className="foo-zl-footer">
      {/* Background Layers for Light and Dark Modes */}
      <div className="foo-zl-bg-light" />
      <div className="foo-zl-bg-dark" />
      
      {/* Starry Sky for Dark Mode */}
      <div className="foo-zl-stars" />
      
      {/* Deer Icon Overlay (visible only in dark mode to compensate for the dark background) */}
      <Image 
        loader={cloudinaryLoader}
        src="https://res.cloudinary.com/duibfmcw1/image/upload/v1786006495/mammal_cz8uck.png" 
        alt="Deer Silhouette" 
        width={100}
        height={100}
        loading="lazy"
        className="foo-zl-bg-deer"
      />

      {/* Atmospheric Mist Layer */}
      <div className="foo-zl-mist-light" />
      <div className="foo-zl-mist-dark" />
      
      {/* Seamless Transition Overlay (Fades from page bg to transparent) */}
      <div className="foo-zl-seamless-overlay" />

      <div className="foo-zl-footer-inner">
        {/* ================= BRAND SECTION ================= */}
        <div className="foo-zl-brand foo-zl-glass">
          <div className="foo-zl-logo">
            <Image
              loader={cloudinaryLoader}
              src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png"
              alt="ZooLearn Logo"
              width={56}
              height={56}
              loading="lazy"
              className="foo-zl-logo-img"
            />
            <h1>
              <span className="foo-zl-logo-zoo">Zoo</span><span className="foo-zl-logo-learn" data-text="Learn">Learn</span>
            </h1>
          </div>
          <p className="foo-zl-tagline">
            Empowering students and NEET aspirants with interactive zoology
            education. Master biology through visual taxonomy and structured
            learning paths.
          </p>
        </div>

        {/* ================= NAVIGATION LINKS ================= */}
        <div className="foo-zl-links foo-zl-glass">
          {/* -------- PLATFORM -------- */}
          <div className="foo-zl-col">
            <h3>Platform</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/taxonomy-tree">Taxonomy Tree</Link></li>
              <li><Link href="/zoohub">ZooHub</Link></li>
            </ul>
          </div>

          {/* -------- COMPANY -------- */}
          <div className="foo-zl-col">
            <h3>Company</h3>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li>
                <div className="contact-dropdown-container" ref={dropdownRef}>
                  <span
                    className="contact-toggle"
                    onClick={() => setShowContact(!showContact)}
                  >
                    Contact
                  </span>
                  {showContact && (
                    <ul className="contact-dropdown">
                      <li>
                        <a
                          href="mailto:academy.zoolearn@gmail.com"
                          className="contact-dropdown-link"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="contact-icon"
                          >
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                          </svg>
                          Gmail
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/company/111808957/admin/page-posts/published/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-dropdown-link"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="contact-icon"
                          >
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-1.85 0-2.58 1-3 1.66v-1.42h-2.73v8.32h2.73v-4.58c0-1.22.23-2.4 1.74-2.4 1.49 0 1.51 1.39 1.51 2.48v4.54h2.75M6.88 8.56a1.59 1.59 0 1 0 0-3.18 1.59 1.59 0 0 0 0 3.18m1.37 9.94v-8.32H5.5v8.32h2.75" />
                          </svg>
                          LinkedIn
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/zoolearn.academy?igsh=MnJybm1pejExcTRw"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-dropdown-link"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="contact-icon"
                          >
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                          Instagram
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
              <li>
                <a href="mailto:academy.zoolearn@gmail.com">Support</a>
              </li>
            </ul>
          </div>

          {/* -------- LEGAL -------- */}
          <div className="foo-zl-col">
            <h3>Legal</h3>
            <ul>
              <li><Link href="/about">Privacy Policy</Link></li>
              <li><Link href="/about">Terms of Service</Link></li>
              <li><Link href="/about">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="foo-zl-copyright foo-zl-glass-copyright">
        <div className="foo-zl-copyright-content">
          <span>© {new Date().getFullYear()} ZooLearn EdTech. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
