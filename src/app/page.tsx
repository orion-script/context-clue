"use client";

import { Bug, Sparkles, Eye, Code, Zap, ExternalLink } from "lucide-react";
import DebuggerInterface from "@/components/DebuggerInterface";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur py-4">
        <div className="container flex items-center justify-between max-w-5xl mx-auto px-6">
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
      <section className="py-16 md:py-24 text-center container max-w-4xl space-y-5 px-6">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground mb-2">
          Fix UI bugs 10x faster
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Use{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-600">
            Multimodal AI
          </span>{" "}
          to debug your frontend code.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Drop in a screenshot of the broken UI and your component code. Context
          Clue uses Nova&apos;s visual understanding to pinpoint exactly which
          line is causing the glitch.
        </p>
      </section>

      {/* Debugger */}
      <section className="container max-w-5xl pb-16 px-6">
        <DebuggerInterface />
      </section>

      {/* How It Works */}
      <section className="border-t bg-muted/30 py-16 w-full">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">1. Upload Screenshot</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop a screenshot of the broken UI. Nova analyzes the
                visual layout and identifies anomalies.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">2. Upload Code</h3>
              <p className="text-sm text-muted-foreground">
                Add the component file. Nova reads the code structure and maps
                it to the visual elements in the screenshot.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">3. Get Fix</h3>
              <p className="text-sm text-muted-foreground">
                Receive a precise diagnosis with the exact line, a code diff,
                and a one-click copy of the corrected code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 w-full">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto px-6">
          <p className="text-sm text-muted-foreground">
            Context Clue — Amazon Nova AI Hackathon 2025
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a
              href="https://amazon-nova.devpost.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              Devpost <ExternalLink className="h-3 w-3" />
            </a>
            <span>By Team Orion</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
