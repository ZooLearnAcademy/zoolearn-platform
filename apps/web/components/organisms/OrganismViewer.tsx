"use client";

import React from "react";
import { notFound } from "next/navigation";
import { OrganismShell } from "./unified/OrganismShell";
import { leechData } from "@/data/organisms/leech-data";
import { rabbitData } from "@/data/organisms/rabbit-data";
import { cockroachData } from "@/data/organisms/cockroach-data";
import { frogData } from "@/data/organisms/frog-data";
import { honeybeeData } from "@/data/organisms/honeybee-data";
import { humanEvolutionData } from "@/data/organisms/human-evolution-data";

export function OrganismViewer({ slug }: { slug: string }) {
  const normalizedSlug = slug.toLowerCase();

  switch (normalizedSlug) {
    case "leech":
      return <OrganismShell data={leechData} />;
    case "rabbit":
      return <OrganismShell data={rabbitData} />;
    case "cockroach":
      return <OrganismShell data={cockroachData} />;
    case "frog":
      return <OrganismShell data={frogData} />;
    case "honey-bee":
    case "honeybee":
      return <OrganismShell data={honeybeeData} />;
    case "human-evolution":
    case "horse-evolution":
      return <OrganismShell data={humanEvolutionData} />;
    default:
      notFound();
  }
}
