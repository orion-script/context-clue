# Devpost Submission: Context Clue

## Project Name

Context Clue

## Elevator Pitch (Short Description)

Context Clue is a multimodal AI debugging tool that uses Amazon Nova Multimodal embeddings to fix UI glitches in seconds. Just drop your screenshot and code.

## The Story (Long Description)

### Inspiration

Frontend development is painful:

1.  See a visual bug (e.g., text overlap, broken card layout).
2.  Guess which line of CSS is causing it.
3.  Search through multiple component files.
4.  Try changing `z-index`, `flex-direction`, or `overflow`.
    Context Clue eliminates the guesswork by directly mapping the _visual_ error to the _code_ that caused it.

### What it does

Context Clue is an agentic debugger:

1.  **See It:** Drag and drop a screenshot of the broken UI.
2.  **Read It:** Upload the component code (`.tsx`, `.css`) responsible for that view.
3.  **Cross-Reference:** **Amazon Nova Multimodal** (via Bedrock) analyzes both the visual layout structure (Is this element outside its container?) and the code syntax (Is there `overflow-hidden` applied?).
4.  **Pinpoint the Fix:** It highlights the exact line causing the issue (e.g., "Line 42: z-index is too low") and generates the corrected code block instantly.

### How we built it

- **Multimodal Inference:** We leveraged the **Amazon Bedrock Runtime** to send both image data (base64) and text (code snippet) to the **Nova Lite (Text-to-Text)** endpoint, prompting it to act as a multimodal "visual debugger."
- **Frontend Check:** React Dropzone handles the file inputs.
- **Diff Visualization:** Created a custom code diff viewer with **Tailwind CSS** to show exactly what to remove (red) and add (green).

### Challenges we ran into

- **Correlating visuals to code:** Ensuring the AI understands _why_ a particular CSS property causes a visual glitch required prompting specifically about layout engines (flexbox/grid/absolute).
- **Formatting code diffs:** Getting the clean `before` and `after` blocks from the LLM response took some JSON structure tuning.

### Accomplishments that we're proud of

- The "Copy Fix" button actually works—it grabs just the clean code.
- The UI feels like a pro developer tool (dark mode, monospaced fonts, clean).
- Successfully simulating a complex multimodal agentic workflow with a simple Next.js backend.

### What we learned

Multimodal models are not just for generating images—they are incredibly powerful for _understanding_ complex visual-spatial relationships in UI code. We realized that debugging is often visual first, code second.

### What's next for Context Clue

- **VS Code Extension:** Right-click a component in your editor to "Debug Visually."
- **Live Preview:** Instantly showing the fixed UI render without needing to save/reload.
- **Full Project Context:** Analyzing multiple interconnected components at once.

## Built With

- Amazon Nova Multimodal
- Amazon Nova Act
- Amazon Bedrock
- Next.js
- React Dropzone
- Tailwind CSS
- Shadcn/UI
