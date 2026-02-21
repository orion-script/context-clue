"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileCode,
  CheckCircle,
  Loader2,
  ArrowRight,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function DebuggerInterface() {
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [codeSnippet, setCodeSnippet] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onDropScreenshot = (acceptedFiles: File[]) =>
    setScreenshot(acceptedFiles[0]);
  const onDropCode = (acceptedFiles: File[]) =>
    setCodeSnippet(acceptedFiles[0]);

  const {
    getRootProps: getScreenshotProps,
    getInputProps: getScreenshotInput,
  } = useDropzone({
    onDrop: onDropScreenshot,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const { getRootProps: getCodeProps, getInputProps: getCodeInput } =
    useDropzone({
      onDrop: onDropCode,
      accept: {
        "text/*": [".js", ".jsx", ".tsx", ".css", ".html", ".vue", ".svelte"],
      },
      maxFiles: 1,
    });

  const handleAnalyze = async () => {
    if (!screenshot || !codeSnippet) return;
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      // Read the code file content
      const codeContent = await codeSnippet.text();

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          screenshotName: screenshot.name,
          codeName: codeSnippet.name,
          codeContent,
        }),
      });

      if (!res.ok) throw new Error("Analysis failed");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setScreenshot(null);
    setCodeSnippet(null);
    setResult(null);
    setError(null);
  };

  const handleCopyFix = () => {
    if (result?.after) {
      navigator.clipboard.writeText(result.after);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Screenshot */}
        <div
          {...getScreenshotProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 h-56",
            screenshot
              ? "border-green-500 bg-green-500/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50",
          )}
        >
          <input {...getScreenshotInput()} />
          {screenshot ? (
            <>
              <CheckCircle className="w-10 h-10 text-green-500 mb-3" />
              <p className="font-medium truncate max-w-50">
                {screenshot.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {(screenshot.size / 1024).toFixed(0)} KB — Click to replace
              </p>
            </>
          ) : (
            <>
              <Upload className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="font-medium">Drop UI Screenshot</p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, WebP
              </p>
            </>
          )}
        </div>

        {/* Upload Code */}
        <div
          {...getCodeProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 h-56",
            codeSnippet
              ? "border-blue-500 bg-blue-500/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50",
          )}
        >
          <input {...getCodeInput()} />
          {codeSnippet ? (
            <>
              <FileCode className="w-10 h-10 text-blue-500 mb-3" />
              <p className="font-medium truncate max-w-50">
                {codeSnippet.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {(codeSnippet.size / 1024).toFixed(1)} KB — Click to replace
              </p>
            </>
          ) : (
            <>
              <FileCode className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="font-medium">Drop Code Component</p>
              <p className="text-xs text-muted-foreground mt-1">
                TSX, JSX, CSS, HTML, Vue
              </p>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3">
        <Button
          size="lg"
          className="px-12 text-base h-12"
          disabled={!screenshot || !codeSnippet || isAnalyzing}
          onClick={handleAnalyze}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing with Nova...
            </>
          ) : (
            <>
              Debug UI
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
        {(result || screenshot || codeSnippet) && (
          <Button
            variant="outline"
            size="lg"
            className="h-12"
            onClick={handleReset}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border bg-card text-card-foreground shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary/10 p-4 border-b border-primary/20 flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Bug Located
            </h3>
            <span className="text-sm font-mono text-muted-foreground">
              {result.confidence}% Confidence
            </span>
          </div>

          <div className="p-6 space-y-5">
            {/* Location */}
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-0.5 rounded bg-muted font-mono text-xs">
                {result.bugLocation}
              </span>
            </div>

            {/* Diagnosis */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Diagnosis
              </h4>
              <p className="text-base">{result.suggestion}</p>
            </div>

            {/* Code Diff */}
            <div className="rounded-lg bg-[#1e1e2e] p-4 font-mono text-sm overflow-x-auto">
              <div className="text-gray-500 mb-2 text-xs">
                 {result.bugLocation}
              </div>
              <div className="text-red-400 bg-red-500/10 px-2 py-1 rounded mb-1">
                - {result.before || result.snippet}
              </div>
              <div className="text-green-400 bg-green-500/10 px-2 py-1 rounded">
                + {result.after || result.snippet?.replace("z-10", "z-50")}
              </div>
            </div>

            {/* Fix Description */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Recommended Fix
              </h4>
              <p>{result.fix}</p>
            </div>

            {/* Copy button */}
            <Button variant="outline" size="sm" onClick={handleCopyFix}>
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Fix
                </>
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
