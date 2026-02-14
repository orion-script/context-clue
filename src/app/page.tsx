"use client";

import { Bug, Sparkles } from "lucide-react";
import DebuggerInterface from "@/components/DebuggerInterface";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center">
      {/* Header */}
      <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
              <Bug className="h-5 w-5" />
            </div>
            <span>Context Clue</span>
          </div>
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span>Powered by Amazon Nova Multimodal</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32 text-center container max-w-4xl space-y-6">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
          Fix UI bugs 10x faster
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Use{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Multimodal AI
          </span>{" "}
          to debug your frontend code.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Drop in a screenshot of the broken UI and your component code. Context
          Clue uses visual embeddings to pinpoint exactly which CSS/JS line is
          causing the glitch.
        </p>
      </section>

      {/* Debugger */}
      <section className="container max-w-5xl pb-20">
        <DebuggerInterface />
      </section>
    </main>
  );
}
