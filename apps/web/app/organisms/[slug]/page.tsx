import React from "react";
import { OrganismViewer } from "@/components/organisms/OrganismViewer";

interface OrganismPageProps {
  params: Promise<{ slug: string }>;
}

export default async function OrganismPage({ params }: OrganismPageProps) {
  const { slug } = await params;
  return <OrganismViewer slug={slug} />;
}
