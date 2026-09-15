import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@workspace/ui/components/sidebar";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { ZoohubSearch, type SearchItem } from "@/components/zoohub-search";
import { getAllPhyla, getPhylumWithSpecies } from "@/lib/supabase/zoohub-public";

export default async function ZoohubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch all phyla from DB (ordered)
  const allPhyla = await getAllPhyla();

  // Fetch classes+species for sidebar (lightweight — only slug/name/class_name)
  // We fetch each phylum's class list for the expandable sidebar
  const phylaWithClasses = await Promise.all(
    allPhyla.map(async (p) => {
      const detail = await getPhylumWithSpecies(p.slug);
      return { ...p, classes: detail?.classes ?? [] };
    })
  );

  // Build search index
  const searchIndex: SearchItem[] = [];
  for (const phylum of phylaWithClasses) {
    const path = `/zoohub/${phylum.slug}`;
    searchIndex.push({ title: phylum.name, subtitle: "Phylum", url: path });
    for (const cls of phylum.classes) {
      searchIndex.push({
        title: cls.className,
        subtitle: `Class in ${phylum.name}`,
        url: `${path}#${cls.slug}`,
      });
      for (const species of cls.species) {
        searchIndex.push({
          title: species.name,
          subtitle: `Species (${species.scientificName ?? ""})`,
          url: `${path}/${species.slug}`,
        });
      }
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Global Navbar */}
      <div className="shrink-0 z-50">
        <Navbar />
      </div>

      <div className="flex-1 relative overflow-hidden">
        <SidebarProvider className="absolute inset-0 min-h-0 h-full w-full">
          <Sidebar className="!top-16 md:!top-20 !h-[calc(100svh-4rem)] md:!h-[calc(100svh-5rem)] border-r border-slate-200 dark:border-slate-800">
            <SidebarContent>
              <div className="px-2 pt-4">
                <ZoohubSearch searchIndex={searchIndex} />
              </div>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-2 px-2 mt-2">
                    <SidebarMenuItem>
                      <SidebarMenuButton render={<Link href="/zoohub" />} className="hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/50 py-5 transition-colors">
                        <span className="font-bold text-base text-slate-800 dark:text-slate-200">Introduction</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Phylums
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-2 px-2 pb-6">
                    {phylaWithClasses.map((phylum) => (
                      <SidebarMenuItem key={phylum.slug}>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                          <summary className="list-none cursor-pointer">
                            <SidebarMenuButton render={<div />} className="hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/50 py-5 transition-colors">
                              <div className="flex items-center justify-between w-full pr-2">
                                <Link href={`/zoohub/${phylum.slug}`} className="flex-1">
                                  <span className="font-bold text-base text-slate-800 dark:text-slate-200">{phylum.name}</span>
                                </Link>
                                {phylum.classes.length > 0 && (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" className="text-slate-500 transition-transform group-open:rotate-180">
                                    <path fill="currentColor" d="M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80A8 8 0 0 1 53.66 90.34L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32z"/>
                                  </svg>
                                )}
                              </div>
                            </SidebarMenuButton>
                          </summary>

                          {phylum.classes.length > 0 && (
                            <SidebarMenuSub className="mt-1 ml-3 border-l border-emerald-100 dark:border-slate-800 pl-3">
                              {phylum.classes.map((cls) => (
                                <SidebarMenuSubItem key={cls.slug}>
                                  <SidebarMenuSubButton
                                    render={<Link href={`/zoohub/${phylum.slug}#${cls.slug}`} />}
                                    className="hover:bg-emerald-50 hover:text-emerald-700 h-8 text-sm font-medium text-slate-600 dark:text-slate-400"
                                  >
                                    {cls.className}
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          )}
                        </details>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0a0a0a] overflow-y-auto relative z-0">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />
            <div className="sticky top-0 z-10 px-4 py-3 bg-white/40 dark:bg-black/40 backdrop-blur-md border-b border-white/50 dark:border-white/5">
              <SidebarTrigger className="text-slate-500 hover:text-slate-900" />
            </div>
            <main className="flex-1 scroll-smooth">{children}</main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
