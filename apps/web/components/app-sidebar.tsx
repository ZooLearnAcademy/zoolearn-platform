"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import { BookOpen, Compass } from "@phosphor-icons/react"
import { livingWorldTopics } from "@/data/the-living-world-topics"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTopicId?: string
  onSelectTopic?: (topicId: string) => void
  onSelectCard?: (topicId: string, cardId: string) => void
}

export function AppSidebar({
  activeTopicId = "introduction",
  onSelectTopic,
  onSelectCard,
  ...props
}: AppSidebarProps) {
  const handleCardClick = (topicId: string, cardId: string) => {
    onSelectTopic?.(topicId)
    if (onSelectCard) {
      onSelectCard(topicId, cardId)
    } else {
      setTimeout(() => {
        const el = document.getElementById(cardId)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }

  return (
    <Sidebar {...props} className="border-r border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 font-sans">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<div />} className="hover:bg-emerald-50 dark:hover:bg-emerald-950/40 py-4">
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

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1.5 px-2">
            {livingWorldTopics.map((topic) => {
              const isTopicActive = activeTopicId === topic.id

              return (
                <SidebarMenuItem key={topic.id}>
                  <SidebarMenuButton
                    isActive={isTopicActive}
                    onClick={() => onSelectTopic?.(topic.id)}
                    className="text-sm font-bold py-3.5 px-3 rounded-xl transition-all hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-800/60 dark:hover:text-emerald-300"
                  >
                    <span className="truncate">{topic.title}</span>
                    {isTopicActive && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

