"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileCode,
  CheckCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function DebuggerInterface() {
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [codeSnippet, setCodeSnippet] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

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
      accept: { "text/*": [".js", ".tsx", ".css", ".html"] },
      maxFiles: 1,
    });

  const handleAnalyze = async () => {
    if (!screenshot || !codeSnippet) return;
    setIsAnalyzing(true);

    // Simulate API call for demo
    setTimeout(() => {
      setResult({
        bugLocation: "Line 42 in Header.tsx",
        confidence: 94,
        suggestion:
          "The z-index of the navbar is lower than the hero image overlay.",
        fix: "Change 'z-10' to 'z-50' in the className.",
        snippet: `<header className="fixed top-0 w-full z-10">`, // This would be the "before"
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Screenshot */}
        <div
          {...getScreenshotProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors h-64",
            screenshot
              ? "border-green-500 bg-green-50/10"
              : "border-border hover:border-primary/50 hover:bg-muted/50",
          )}
        >
          <input {...getScreenshotInput()} />
          {screenshot ? (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <p className="font-medium truncate max-w-[200px]">
                {screenshot.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Click to replace
              </p>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="font-medium">Drop UI Screenshot</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG</p>
            </>
          )}
        </div>

        {/* Upload Code */}
        <div
          {...getCodeProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors h-64",
            codeSnippet
              ? "border-blue-500 bg-blue-50/10"
              : "border-border hover:border-primary/50 hover:bg-muted/50",
          )}
        >
          <input {...getCodeInput()} />
          {codeSnippet ? (
            <>
              <FileCode className="w-12 h-12 text-blue-500 mb-4" />
              <p className="font-medium truncate max-w-[200px]">
                {codeSnippet.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Click to replace
              </p>
            </>
          ) : (
            <>
              <FileCode className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="font-medium">Drop Code Component</p>
              <p className="text-xs text-muted-foreground mt-1">
                TSX, CSS, HTML
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          className="w-full md:w-auto px-12 text-lg h-12"
          disabled={!screenshot || !codeSnippet || isAnalyzing}
          onClick={handleAnalyze}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Syncing Multimodal Embeddings...
            </>
          ) : (
            <>
              Debug UI
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border bg-card text-card-foreground shadow-lg overflow-hidden"
        >
          <div className="bg-primary/10 p-4 border-b border-primary/20 flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Bug Located
            </h3>
            <span className="text-sm font-mono text-muted-foreground">
              {result.confidence}% Confidence
            </span>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Diagnosis
              </h4>
              <p className="text-lg">{result.suggestion}</p>
            </div>

            <div className="p-4 bg-muted rounded-md font-mono text-sm overflow-x-auto">
              <div className="text-muted-foreground mb-2">
                // {result.bugLocation}
              </div>
              <div className="text-red-400">- {result.snippet}</div>
              <div className="text-green-400">
                + {result.snippet.replace("z-10", "z-50")}
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Recommended Fix
              </h4>
              <p>{result.fix}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
