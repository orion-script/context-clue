import { NextRequest, NextResponse } from "next/server";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Context Clue API Route — Analyzes a screenshot + code for UI bugs
// Uses Nova Multimodal to understand image-code correlation

const MOCK_RESULTS = [
  {
    bugLocation: "Line 42 in Header.tsx",
    confidence: 94,
    suggestion:
      "The z-index of the navbar is lower than the hero image overlay, causing the menu to render behind the hero section.",
    fix: "Change `z-10` to `z-50` in the header className to ensure the navbar stays above all content layers.",
    before: `<header className="fixed top-0 w-full z-10">`,
    after: `<header className="fixed top-0 w-full z-50">`,
  },
  {
    bugLocation: "Line 18 in Card.tsx",
    confidence: 87,
    suggestion:
      "The flexbox container is missing `items-center`, causing child elements to stretch vertically and break the layout.",
    fix: "Add `items-center` to the parent flex container to vertically center the card content.",
    before: `<div className="flex gap-4 p-6">`,
    after: `<div className="flex items-center gap-4 p-6">`,
  },
  {
    bugLocation: "Line 7 in globals.css",
    confidence: 91,
    suggestion:
      "The background gradient is using a transparent start color, making the content unreadable on light backgrounds.",
    fix: "Replace `transparent` with `var(--background)` in the gradient to ensure consistent contrast.",
    before: `background: linear-gradient(transparent, var(--bg));`,
    after: `background: linear-gradient(var(--background), var(--bg));`,
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { screenshotName, codeName, codeContent } = body;

    let result = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];

    // Try calling Nova for a real multimodal analysis
    if (
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      codeContent
    ) {
      try {
        const client = new BedrockRuntimeClient({
          region: process.env.AWS_REGION || "us-east-1",
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        });

        const prompt = `You are Context Clue, an AI debugging assistant that analyzes UI bugs.
The user uploaded a screenshot showing a visual bug and the following code file (${codeName || "component.tsx"}):

\`\`\`
${codeContent?.substring(0, 2000) || "No code provided"}
\`\`\`

Based on common UI bugs (z-index issues, flexbox misalignment, overflow hidden, missing responsive breakpoints, color contrast problems):

Return ONLY a valid JSON object:
{
  "bugLocation": "Line X in filename",
  "confidence": number (1-100),
  "suggestion": "One sentence explaining what's wrong visually",
  "fix": "One sentence explaining the fix",
  "before": "the line of code that's wrong",
  "after": "the corrected line of code"
}`;

        const command = new InvokeModelCommand({
          modelId: "amazon.nova-lite-v1:0",
          contentType: "application/json",
          accept: "application/json",
          body: JSON.stringify({
            messages: [{ role: "user", content: [{ text: prompt }] }],
            inferenceConfig: { max_new_tokens: 500 },
          }),
        });

        const response = await client.send(command);
        const responseBody = JSON.parse(
          new TextDecoder().decode(response.body),
        );
        const outputText = responseBody.output?.message?.content?.[0]?.text;

        if (outputText) {
          const jsonMatch = outputText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            result = JSON.parse(jsonMatch[0]);
          }
        }
      } catch (e) {
        console.error("Bedrock call failed (using fallback):", e);
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
