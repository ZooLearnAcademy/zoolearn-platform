"use client";

import React, { useState } from "react";
import { MagnifyingGlass, Sparkle } from "@phosphor-icons/react";
import { Input } from "@workspace/ui/components/input";

export function NCERTTaxaTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const taxaData = [
    {
      commonName: "Man",
      biologicalName: "Homo sapiens",
      genus: "Homo",
      family: "Hominidae",
      order: "Primata",
      class: "Mammalia",
      phylumDivision: "Chordata"
    },
    {
      commonName: "Housefly",
      biologicalName: "Musca domestica",
      genus: "Musca",
      family: "Muscidae",
      order: "Diptera",
      class: "Insecta",
      phylumDivision: "Arthropoda"
    },
    {
      commonName: "Mango",
      biologicalName: "Mangifera indica",
      genus: "Mangifera",
      family: "Anacardiaceae",
      order: "Sapindales",
      class: "Dicotyledonae",
      phylumDivision: "Angiospermae"
    },
    {
      commonName: "Wheat",
      biologicalName: "Triticum aestivum",
      genus: "Triticum",
      family: "Poaceae",
      order: "Poales",
      class: "Monocotyledonae",
      phylumDivision: "Angiospermae"
    }
  ];

  const filteredData = taxaData.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.commonName.toLowerCase().includes(q) ||
      item.biologicalName.toLowerCase().includes(q) ||
      item.genus.toLowerCase().includes(q) ||
      item.family.toLowerCase().includes(q) ||
      item.order.toLowerCase().includes(q) ||
      item.class.toLowerCase().includes(q) ||
      item.phylumDivision.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mt-6 flex flex-col gap-4">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            NCERT Table 1.1 — Direct Examination Reference
          </span>
        </div>
        <div className="relative w-full sm:w-64">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search organism, order, family..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-8 text-xs bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/80 font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3">Common Name</th>
              <th className="px-4 py-3">Biological Name</th>
              <th className="px-4 py-3">Genus</th>
              <th className="px-4 py-3">Family</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Phylum / Division</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredData.map((row) => (
              <tr
                key={row.commonName}
                className="transition-colors hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10"
              >
                <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-slate-100">
                  {row.commonName}
                </td>
                <td className="px-4 py-3.5 font-serif italic text-emerald-700 dark:text-emerald-400 font-medium">
                  {row.biologicalName}
                </td>
                <td className="px-4 py-3.5 font-serif italic text-slate-700 dark:text-slate-300">
                  {row.genus}
                </td>
                <td className="px-4 py-3.5 font-medium text-amber-700 dark:text-amber-400">
                  {row.family}
                </td>
                <td className="px-4 py-3.5 font-medium text-sky-700 dark:text-sky-400">
                  {row.order}
                </td>
                <td className="px-4 py-3.5 font-medium text-purple-700 dark:text-purple-400">
                  {row.class}
                </td>
                <td className="px-4 py-3.5 font-semibold text-rose-700 dark:text-rose-400">
                  {row.phylumDivision}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-400">
            No organisms matching "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
}
