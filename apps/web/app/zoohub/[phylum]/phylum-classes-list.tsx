"use client";

import React from "react";
import Link from "next/link";

interface SpeciesItem {
  id: number | string;
  name: string;
  scientificName?: string;
  scientific_name?: string;
  slug?: string;
  image?: string;
}

interface PhylumClass {
  className: string;
  slug?: string;
  species: SpeciesItem[];
}

interface PhylumClassesListProps {
  classes: PhylumClass[];
  phylum: string;
}

export function PhylumClassesList({ classes, phylum }: PhylumClassesListProps) {
  if (!classes || classes.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        No classes or species found for this phylum.
      </div>
    );
  }

  return (
    <div className="w-full space-y-32 pb-24">
      {classes.map((cls, idx) => {
        const classSlug = cls.slug || cls.className.toLowerCase().replace(/\s+/g, "-");
        return (
          <div key={classSlug || idx} id={classSlug} className="w-full scroll-mt-32">
            <div className="mb-16 group">
              <div className="flex items-start gap-4 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="w-2 h-16 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />
                <div className="flex flex-col gap-3">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                    {cls.className}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-transparent border border-slate-200 dark:border-slate-700 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-widest">
                      Class
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm font-bold border border-emerald-100/80 dark:border-emerald-800/40">
                      {cls.species?.length ?? 0} Species
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[clamp(1rem,3vw,2rem)] gap-y-[clamp(4rem,10vw,6rem)] mt-16 px-2 sm:px-4">
              {cls.species?.map((species, i) => {
                const speciesSlug =
                  species.slug || species.name.toLowerCase().replace(/\s+/g, "-");
                const sciName = species.scientificName || species.scientific_name || "";

                return (
                  <Link
                    key={species.id || i}
                    href={`/zoohub/${phylum}/${speciesSlug}`}
                    id={`sp-${species.id}`}
                    className="flex flex-col items-center justify-start group cursor-pointer h-full text-center scroll-mt-32"
                  >
                    <div className="w-full max-w-[14rem] aspect-square flex items-center justify-center mb-4 relative mx-auto">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={species.image ?? ""}
                        alt={species.name}
                        className="relative z-10 w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_15px_25px_rgba(16,185,129,0.15)] group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300 ease-out"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-[clamp(1.125rem,3vw,1.5rem)] font-extrabold italic text-slate-800 dark:text-slate-100 mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {species.name}
                    </h3>
                    {sciName && (
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 mt-auto group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-colors duration-300">
                        <span className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-slate-600 dark:text-slate-300 font-bold group-hover:text-emerald-700 truncate">
                          {sciName}
                        </span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
