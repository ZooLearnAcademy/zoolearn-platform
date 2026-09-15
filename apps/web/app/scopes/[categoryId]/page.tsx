import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getScopeCategoryById,
  getScopeCareersForCategory,
  getScopeCategories,
} from "@/lib/supabase/scope-admin";
import { courseDetails } from "@/data/scopes-data";
import type { CourseDetail } from "@/data/scopes-data";

export const dynamic = "force-dynamic";

interface ScopeCategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

export async function generateMetadata({
  params,
}: ScopeCategoryPageProps): Promise<Metadata> {
  const { categoryId } = await params;
  const category = await getScopeCategoryById(categoryId);

  if (!category) {
    return { title: "Scope Not Found | ZooLearn" };
  }

  return {
    title: `${category.name} | Career Scopes | ZooLearn`,
    description:
      category.description ||
      `Explore career pathways in ${category.name} with detailed academic roadmaps.`,
    openGraph: {
      title: `${category.name} | ZooLearn Career Scopes`,
      description: category.description || `Career pathways in ${category.name}`,
      type: "website",
    },
  };
}

export default async function ScopeCategoryPage({
  params,
}: ScopeCategoryPageProps) {
  const { categoryId } = await params;
  const category = await getScopeCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  const [careers, allCategories] = await Promise.all([
    getScopeCareersForCategory(categoryId),
    getScopeCategories(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${category.gradient || "from-emerald-500/20 to-teal-500/10"} border-b border-border`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link
            href="/scopes"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-500 transition-colors mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 256 256"
              fill="currentColor"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
            Back to All Scopes
          </Link>

          <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-3">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mb-5">
              {category.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {category.salary_range && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background/60 backdrop-blur-sm rounded-full text-foreground font-medium border border-border">
                💰 {category.salary_range}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background/60 backdrop-blur-sm rounded-full text-foreground font-medium border border-border">
              📋 {careers.length} Career{careers.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Careers List */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {careers.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No Careers Listed Yet
            </h3>
            <p className="text-muted-foreground">
              Career items for this scope will appear here once added by an
              admin.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {careers.map((career) => (
              <div
                key={career.id}
                className="group relative bg-card border border-border rounded-2xl p-5 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base group-hover:text-emerald-500 transition-colors leading-snug">
                      {career.title}
                    </h3>
                    {career.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {career.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-3">
                    {career.badge && (
                      <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        {career.badge}
                      </span>
                    )}
                    {career.is_top_choice && (
                      <span className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        ⭐ Top Choice
                      </span>
                    )}
                  </div>
                </div>

                {career.salary && (
                  <div className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                    <span>💰</span>
                    <span>{career.salary}</span>
                  </div>
                )}

                {/* Academic Pathways */}
                <div className="space-y-2">
                  {career.bsc && career.bsc.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-xs font-semibold text-blue-500 shrink-0 w-8">
                        B.Sc
                      </span>
                      {career.bsc.map((course) => (
                        <span
                          key={course}
                          title={
                            (courseDetails as Record<string, CourseDetail>)[course]?.exp || course
                          }
                          className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full cursor-default"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                  {career.msc && career.msc.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-xs font-semibold text-violet-500 shrink-0 w-8">
                        M.Sc
                      </span>
                      {career.msc.map((course) => (
                        <span
                          key={course}
                          title={
                            (courseDetails as Record<string, CourseDetail>)[course]?.exp || course
                          }
                          className="text-xs bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-full cursor-default"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                  {career.phd && career.phd.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-xs font-semibold text-amber-500 shrink-0 w-8">
                        Ph.D
                      </span>
                      {career.phd.map((course) => (
                        <span
                          key={course}
                          title={
                            (courseDetails as Record<string, CourseDetail>)[course]?.exp || course
                          }
                          className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full cursor-default"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Key Skills */}
                {career.key_skills && career.key_skills.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-1.5">
                    {career.key_skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-slate-500/10 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Other Categories */}
        {allCategories.length > 1 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Explore Other Scopes
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {allCategories
                .filter((c) => c.id !== categoryId)
                .map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/scopes/${cat.id}`}
                    className={`group bg-gradient-to-br ${cat.gradient || "from-slate-500/10 to-slate-500/5"} border border-border rounded-xl p-4 hover:border-emerald-500/40 transition-all duration-200`}
                  >
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-emerald-500 transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    {cat.salary_range && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {cat.salary_range}
                      </p>
                    )}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
