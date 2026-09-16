"use client";

import React, { useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  return [ref, true] as const;
}

export function ScrollReveal({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={ref} className={`scroll-reveal ${className}`} {...props}>
      {children}
    </div>
  );
}

export function StaggerReveal({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={ref} className={`stagger-reveal ${className}`} {...props}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div key={index} className="stagger-item">
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

export default ScrollReveal;
