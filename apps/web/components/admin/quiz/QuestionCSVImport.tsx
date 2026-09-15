"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  DownloadSimple,
  UploadSimple,
  FileCsv,
  CheckCircle,
  Warning,
  SpinnerGap,
  X,
  Trash,
  Eye,
} from "@phosphor-icons/react";
import type { QuestionType } from "@/types/quiz";

// ─── CSV Format ───────────────────────────────────────────────
//
// Columns:
//   question_text  | Required. The question.
//   question_type  | single_choice | multiple_choice | true_false
//   points         | Number (default: 1)
//   is_required    | true | false  (default: true)
//   explanation    | Optional explanation text
//   keywords       | Comma-separated keywords e.g. "photosynthesis,cell"
//   option_a       | Option A text
//   option_b       | Option B text
//   option_c       | Option C text
//   option_d       | Option D text
//   option_e       | Option E text (optional)
//   correct        | For single_choice: "A", "B", "C", "D", or "E"
//                  | For multiple_choice: "A,C" or "B,D" etc.
//                  | For true_false: "True" or "False"
//
// ─────────────────────────────────────────────────────────────

const SAMPLE_CSV = `question_text,question_type,points,is_required,explanation,keywords,option_a,option_b,option_c,option_d,option_e,correct
What does HTML stand for?,single_choice,1,true,HTML is the standard markup language for web pages.,html;web;markup,Hyper Text Markup Language,High Text Machine Language,Hyper Transfer Markup Language,Home Tool Markup Language,,A
Which of the following are JavaScript data types?,multiple_choice,2,true,JavaScript has several primitive data types.,javascript;datatypes,String,Number,Boolean,Object,Function,A,B,C,D,E
Is CSS a programming language?,true_false,1,true,CSS is a style sheet language not a programming language.,css;programming,True,False,,,, False
What is the correct syntax to select an element by ID in CSS?,single_choice,1,true,,css;selectors,#element,.element,element,*element,,A
`;

interface ParsedRow {
  question_text: string;
  question_type: QuestionType;
  points: number;
  is_required: boolean;
  explanation: string;
  keywords: string[];
  options: Array<{ text: string; is_correct: boolean }>;
  _rowNum: number;
  _error?: string;
}

function parseCSV(raw: string): ParsedRow[] {
  const lines = raw.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const header = lines[0]!.split(",").map((h) => h.trim().toLowerCase().replace(/"/g, ""));

  const col = (row: string[], name: string): string => {
    const idx = header.indexOf(name);
    if (idx === -1) return "";
    const val = row[idx] ?? "";
    return val.replace(/^"|"$/g, "").trim();
  };

  const rows: ParsedRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]!.trim();
    if (!line) continue;

    // CSV split respecting quoted fields
    const cells = splitCSVLine(line);
    const rowNum = i + 1;

    const questionText = col(cells, "question_text");
    const rawType = col(cells, "question_type");
    const pointsRaw = col(cells, "points");
    const isRequiredRaw = col(cells, "is_required");
    const explanation = col(cells, "explanation");
    // keywords: semicolon or pipe separated inside the CSV cell (commas are reserved for CSV)
    const keywordsRaw = col(cells, "keywords");
    const keywords = keywordsRaw
      ? keywordsRaw.split(/[;|]/).map((k) => k.trim()).filter(Boolean)
      : [];
    const optA = col(cells, "option_a");
    const optB = col(cells, "option_b");
    const optC = col(cells, "option_c");
    const optD = col(cells, "option_d");
    const optE = col(cells, "option_e");
    const correctRaw = col(cells, "correct").toUpperCase().trim();

    // Validate type
    const validTypes: QuestionType[] = ["single_choice", "multiple_choice", "true_false"];
    const questionType = rawType as QuestionType;
    if (!validTypes.includes(questionType)) {
      rows.push({
        question_text: questionText,
        question_type: "single_choice",
        points: 1,
        is_required: true,
        explanation,
        keywords: [],
        options: [],
        _rowNum: rowNum,
        _error: `Invalid question_type: "${rawType}". Must be single_choice, multiple_choice, or true_false.`,
      });
      continue;
    }

    if (!questionText) {
      rows.push({
        question_text: "",
        question_type: questionType,
        points: 1,
        is_required: true,
        explanation,
        keywords: [],
        options: [],
        _rowNum: rowNum,
        _error: "question_text is empty",
      });
      continue;
    }

    // Build options
    const optionTexts = [
      { letter: "A", text: optA },
      { letter: "B", text: optB },
      { letter: "C", text: optC },
      { letter: "D", text: optD },
      { letter: "E", text: optE },
    ].filter((o) => o.text.trim() !== "");

    // Correct answer
    let correctLetters: string[] = [];
    if (questionType === "true_false") {
      // Accept "TRUE" or "FALSE"
      correctLetters = [correctRaw.trim()];
    } else if (questionType === "multiple_choice") {
      // "A,C" or "A B C" etc
      correctLetters = correctRaw.split(/[\s,]+/).filter(Boolean);
    } else {
      // single_choice
      correctLetters = [correctRaw.trim()];
    }

    const options = optionTexts.map((o) => {
      let isCorrect = false;
      if (questionType === "true_false") {
        isCorrect = o.text.trim().toUpperCase() === correctLetters[0];
      } else {
        isCorrect = correctLetters.includes(o.letter);
      }
      return { text: o.text, is_correct: isCorrect };
    });

    const hasCorrect = options.some((o) => o.is_correct);
    const row: ParsedRow = {
      question_text: questionText,
      question_type: questionType,
      points: parseInt(pointsRaw) || 1,
      is_required: isRequiredRaw.toLowerCase() !== "false",
      explanation,
      keywords,
      options,
      _rowNum: rowNum,
      _error: !hasCorrect ? "No correct answer marked. Check the 'correct' column." : undefined,
    };

    rows.push(row);
  }

  return rows;
}

function splitCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]!;
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

const TYPE_LABELS: Record<QuestionType, string> = {
  single_choice: "Single",
  multiple_choice: "Multiple",
  true_false: "T/F",
};

interface QuestionCSVImportProps {
  quizId: string;
  onImported: () => void;
}

export function QuestionCSVImport({ quizId, onImported }: QuestionCSVImportProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<"idle" | "preview" | "importing" | "done">("idle");
  const [dragging, setDragging] = useState(false);
  const [parsed, setParsed] = useState<ParsedRow[]>([]);
  const [importError, setImportError] = useState("");
  const [importedCount, setImportedCount] = useState(0);
  const [showAllPreview, setShowAllPreview] = useState(false);

  // ── Download sample template ──────────────────────────────────
  const downloadTemplate = () => {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz_questions_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Parse uploaded CSV ────────────────────────────────────────
  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith(".csv")) {
      setImportError("Please upload a .csv file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = parseCSV(text);
      if (rows.length === 0) {
        setImportError("No valid rows found. Make sure the CSV has a header row and data rows.");
        return;
      }
      setParsed(rows);
      setStep("preview");
      setImportError("");
    };
    reader.readAsText(file);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  // ── Remove a row from preview ─────────────────────────────────
  const removeRow = (rowNum: number) => {
    setParsed((prev) => prev.filter((r) => r._rowNum !== rowNum));
  };

  // ── Import ────────────────────────────────────────────────────
  const handleImport = async () => {
    const validRows = parsed.filter((r) => !r._error);
    if (validRows.length === 0) {
      setImportError("No valid rows to import. Fix the errors first.");
      return;
    }

    setStep("importing");
    setImportError("");

    try {
      const payload = {
        questions: validRows.map((r) => ({
          question_text: r.question_text,
          question_type: r.question_type,
          points: r.points,
          is_required: r.is_required,
          explanation: r.explanation || undefined,
          keywords: r.keywords,
          options: r.options,
        })),
      };

      const res = await fetch(`/api/admin/quiz/${quizId}/questions/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Import failed");

      setImportedCount(data.imported);
      setStep("done");
      router.refresh();
      onImported();
    } catch (e: any) {
      setImportError(e.message);
      setStep("preview");
    }
  };

  const reset = () => {
    setStep("idle");
    setParsed([]);
    setImportError("");
    setImportedCount(0);
    setShowAllPreview(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const errorRows = parsed.filter((r) => r._error);
  const validRows = parsed.filter((r) => !r._error);
  const displayRows = showAllPreview ? parsed : parsed.slice(0, 5);

  // ── DONE state ────────────────────────────────────────────────
  if (step === "done") {
    return (
      <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle size={22} weight="fill" className="text-emerald-400 shrink-0" />
          <div>
            <p className="text-white text-sm font-semibold">
              {importedCount} question{importedCount !== 1 ? "s" : ""} imported successfully
            </p>
            <p className="text-slate-400 text-xs mt-0.5">They have been added to the question list below.</p>
          </div>
        </div>
        <button
          onClick={reset}
          className="text-xs text-slate-500 hover:text-white transition-colors"
        >
          Import more
        </button>
      </div>
    );
  }

  // ── PREVIEW state ─────────────────────────────────────────────
  if (step === "preview" || step === "importing") {
    return (
      <div className="border border-white/10 bg-white/[0.02] rounded-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-semibold">Preview — {parsed.length} rows</p>
            <p className="text-slate-500 text-xs mt-0.5">
              <span className="text-emerald-400">{validRows.length} valid</span>
              {errorRows.length > 0 && (
                <span className="text-red-400 ml-2">{errorRows.length} with errors</span>
              )}
            </p>
          </div>
          <button onClick={reset} className="text-slate-600 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {importError && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl px-3 py-2">
            <Warning size={13} weight="fill" className="shrink-0" />
            {importError}
          </div>
        )}

        {/* Table preview */}
        <div className="overflow-x-auto rounded-xl border border-white/8">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-3 py-2 text-slate-400 font-semibold w-6">#</th>
                <th className="text-left px-3 py-2 text-slate-400 font-semibold min-w-[180px]">Question</th>
                <th className="text-left px-3 py-2 text-slate-400 font-semibold">Type</th>
                <th className="text-left px-3 py-2 text-slate-400 font-semibold">Pts</th>
                <th className="text-left px-3 py-2 text-slate-400 font-semibold">Keywords</th>
                <th className="text-left px-3 py-2 text-slate-400 font-semibold">Options</th>
                <th className="text-left px-3 py-2 text-slate-400 font-semibold">Correct</th>
                <th className="px-2 py-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {displayRows.map((row) => (
                <tr
                  key={row._rowNum}
                  className={`border-b border-white/5 ${
                    row._error ? "bg-red-500/5" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <td className="px-3 py-2 text-slate-600">{row._rowNum}</td>
                  <td className="px-3 py-2">
                    {row._error ? (
                      <div>
                        <p className="text-red-400 text-[10px] flex items-center gap-1">
                          <Warning size={10} weight="fill" />
                          {row._error}
                        </p>
                        <p className="text-slate-500 truncate max-w-[200px]">{row.question_text || "—"}</p>
                      </div>
                    ) : (
                      <p className="text-slate-300 truncate max-w-[200px]">{row.question_text}</p>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <span className="px-1.5 py-0.5 bg-white/5 rounded text-slate-400">
                      {TYPE_LABELS[row.question_type] ?? row.question_type}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-slate-400">{row.points}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-0.5 flex-wrap">
                      {row.keywords.map((kw, i) => (
                        <span key={i} className="text-[10px] bg-violet-500/10 text-violet-400 px-1.5 py-0.5 rounded border border-violet-500/20">{kw}</span>
                      ))}
                      {row.keywords.length === 0 && <span className="text-slate-700 text-[10px]">—</span>}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-slate-400">{row.options.length}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-0.5 flex-wrap">
                      {row.options
                        .filter((o) => o.is_correct)
                        .map((o, i) => (
                          <span key={i} className="text-emerald-400 text-[10px] bg-emerald-500/10 px-1 rounded">
                            {o.text.length > 12 ? o.text.substring(0, 12) + "…" : o.text}
                          </span>
                        ))}
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <button
                      onClick={() => removeRow(row._rowNum)}
                      className="text-slate-700 hover:text-red-400 transition-colors"
                    >
                      <Trash size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show more */}
        {parsed.length > 5 && !showAllPreview && (
          <button
            onClick={() => setShowAllPreview(true)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            <Eye size={12} />
            Show all {parsed.length} rows
          </button>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleImport}
            disabled={validRows.length === 0 || step === "importing"}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-violet-400 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-500/20"
          >
            {step === "importing" ? (
              <>
                <SpinnerGap size={15} className="animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <UploadSimple size={15} />
                Import {validRows.length} Question{validRows.length !== 1 ? "s" : ""}
              </>
            )}
          </button>
          <button
            onClick={reset}
            className="px-4 py-2.5 text-slate-400 hover:text-white text-sm rounded-xl hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          {errorRows.length > 0 && (
            <button
              onClick={() => setParsed((prev) => prev.filter((r) => !r._error))}
              className="px-4 py-2.5 text-amber-400 hover:text-amber-300 text-sm rounded-xl hover:bg-amber-500/5 transition-all text-xs"
            >
              Remove {errorRows.length} error row{errorRows.length !== 1 ? "s" : ""}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── IDLE state ────────────────────────────────────────────────
  return (
    <div className="space-y-3">
      {/* Template download */}
      <div className="flex items-center justify-between px-4 py-3 bg-violet-500/5 border border-violet-500/15 rounded-xl">
        <div>
          <p className="text-sm font-medium text-slate-300">CSV Import</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload a .csv file to add many questions at once.
          </p>
        </div>
        <button
          onClick={downloadTemplate}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/15 border border-violet-500/25 text-violet-400 text-xs font-semibold rounded-lg hover:bg-violet-500/25 transition-all shrink-0"
        >
          <DownloadSimple size={13} />
          Download Template
        </button>
      </div>

      {/* CSV format hint */}
      <div className="px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-slate-500 space-y-1">
        <p className="text-slate-400 font-semibold mb-1.5">CSV Column Reference</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
          {[
            ["question_text", "The question (required)"],
            ["question_type", "single_choice | multiple_choice | true_false"],
            ["points", "Number of points (default: 1)"],
            ["is_required", "true or false"],
            ["explanation", "Optional explanation"],
            ["keywords", "Semicolon-separated e.g. \"cell;biology\" (optional, min 1 recommended)"],
            ["option_a … option_e", "Answer option texts"],
            ["correct", '"A" / "A,C" / "True" / "False"'],
          ].map(([col, desc]) => (
            <div key={col} className="contents">
              <code className="text-violet-400/80">{col}</code>
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-3 py-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
          dragging
            ? "border-violet-500/60 bg-violet-500/10"
            : "border-white/10 hover:border-violet-500/30 hover:bg-violet-500/5"
        }`}
      >
        <FileCsv size={32} className={dragging ? "text-violet-400" : "text-slate-600"} weight="duotone" />
        <div className="text-center">
          <p className="text-sm font-medium text-slate-300">
            {dragging ? "Drop to upload" : "Drag & drop your CSV here"}
          </p>
          <p className="text-xs text-slate-600 mt-1">or click to browse</p>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      {importError && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl px-3 py-2">
          <Warning size={13} weight="fill" className="shrink-0" />
          {importError}
        </div>
      )}
    </div>
  );
}
