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
import { BookOpen } from "@phosphor-icons/react";
import { livingWorldTopics } from "@/data/the-living-world-topics";
import { cn } from "@workspace/ui/lib/utils";

interface LivingWorldSidebarProps {
  activeTopicId: string;
  onSelectTopic: (topicId: string) => void;
  onSelectCard?: (topicId: string, cardId: string) => void;
  className?: string;
}

export function LivingWorldSidebar({
  activeTopicId,
  onSelectTopic,
  onSelectCard,
  className
}: LivingWorldSidebarProps) {
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
              <SidebarMenuButton size="lg" render={<div />} className="hover:bg-emerald-50 dark:hover:bg-emerald-950/40 py-4 px-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#00897b] to-[#00bfa5] text-white shadow-xs">
                  <BookOpen className="size-4" weight="bold" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100">The Living World</span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Class 11 Biology • Ch 1</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Content matching AppSidebar */}
        <SidebarContent className="p-0">
          <SidebarGroup className="p-0">
            <SidebarMenu className="gap-1.5">
              {livingWorldTopics.map((topic) => {
                const isTopicActive = activeTopicId === topic.id;

                return (
                  <SidebarMenuItem key={topic.id}>
                    <SidebarMenuButton
                      isActive={isTopicActive}
                      onClick={() => onSelectTopic(topic.id)}
                      className={cn(
                        "text-sm font-bold py-3.5 px-3.5 rounded-xl transition-all cursor-pointer",
                        isTopicActive
                          ? "bg-[#e0f2f1]/90 text-[#00695c] font-extrabold shadow-2xs dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "text-slate-800 dark:text-slate-200 hover:bg-emerald-50/80 hover:text-emerald-700 dark:hover:bg-slate-800/60"
                      )}
                    >
                      <span className="truncate">{topic.title}</span>
                      {isTopicActive && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        </div>
      </SidebarProvider>
    </aside>
  );
}


