"use client";

import * as React from "react";
import {
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { Dna, ShieldCheck } from "@phosphor-icons/react";
import { structuralOrganisationTopics } from "@/data/structural-organisation-topics";
import { cn } from "@workspace/ui/lib/utils";

interface StructuralOrganisationSidebarProps {
  activeTopicId: string;
  onSelectTopic: (topicId: string) => void;
  onSelectCard?: (topicId: string, cardId: string) => void;
  className?: string;
}

export function StructuralOrganisationSidebar({
  activeTopicId,
  onSelectTopic,
  onSelectCard,
  className
}: StructuralOrganisationSidebarProps) {
  const handleCardClick = (topicId: string, cardId: string) => {
    onSelectTopic(topicId);
    if (onSelectCard) {
      onSelectCard(topicId, cardId);
    } else {
      setTimeout(() => {
        const el = document.getElementById(cardId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <aside
      className={cn(
        "w-full lg:w-72 xl:w-80 lg:shrink-0 lg:sticky lg:top-24 space-y-4 font-sans select-none",
        className
      )}
    >
      <SidebarProvider className="!min-h-0 w-full flex flex-col">
        <div className="w-full rounded-3xl border border-slate-200/90 bg-white/95 p-3 sm:p-4 shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95">
          {/* Header matching AppSidebar */}
          <SidebarHeader className="p-1 mb-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  render={<div />}
                  className="hover:bg-cyan-50 dark:hover:bg-cyan-950/40 py-4 px-2"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-teal-500 text-white shadow-xs">
                    <Dna className="size-4" weight="bold" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100">
                      Structural Organisation
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      Class 11 Biology • Ch 7
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          {/* Content matching AppSidebar */}
          <SidebarContent className="p-0">
            <SidebarGroup className="p-0">
              <SidebarMenu className="gap-1.5">
                {structuralOrganisationTopics.map((topic) => {
                  const isTopicActive = activeTopicId === topic.id;

                  return (
                    <SidebarMenuItem key={topic.id}>
                      <SidebarMenuButton
                        isActive={isTopicActive}
                        onClick={() => onSelectTopic(topic.id)}
                        className={cn(
                          "text-sm font-bold py-3.5 px-3.5 rounded-xl transition-all cursor-pointer",
                          isTopicActive
                            ? "bg-cyan-50 text-cyan-800 font-extrabold shadow-2xs dark:bg-cyan-950/50 dark:text-cyan-300"
                            : "text-slate-800 dark:text-slate-200 hover:bg-cyan-50/70 hover:text-cyan-700 dark:hover:bg-slate-800/60"
                        )}
                      >
                        <span className="truncate">{topic.title}</span>
                        {isTopicActive && (
                          <span className="ml-auto h-2 w-2 rounded-full bg-cyan-600 dark:bg-cyan-400 shrink-0" />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          {/* Quick NCERT Stats Footnote */}
          <div className="mt-4 rounded-xl border border-cyan-500/15 bg-cyan-500/5 p-3 text-[11px] text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 font-bold text-cyan-800 dark:text-cyan-300 mb-1">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>NEET High-Yield Blueprint</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-snug">
              Covers 4 basic animal tissues, junctions, matrices, & contractile muscle units. 2–3 questions expected.
            </p>
          </div>
        </div>
      </SidebarProvider>
    </aside>
  );
}
