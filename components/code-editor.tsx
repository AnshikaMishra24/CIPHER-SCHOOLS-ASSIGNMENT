"use client"

import type { FileNode } from "@/lib/types"
import Editor from "@monaco-editor/react"

interface CodeEditorProps {
  file: FileNode | undefined
  theme: "dark" | "light"
  onChange: (code: string) => void
}

export default function CodeEditor({ file, theme, onChange }: CodeEditorProps) {
  if (!file || file.type !== "file") {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <p>Select a file to edit</p>
      </div>
    )
  }

  const getLanguage = (filename: string) => {
    if (filename.endsWith(".tsx") || filename.endsWith(".jsx")) return "typescript"
    if (filename.endsWith(".ts")) return "typescript"
    if (filename.endsWith(".js")) return "javascript"
    if (filename.endsWith(".css")) return "css"
    if (filename.endsWith(".html")) return "html"
    if (filename.endsWith(".json")) return "json"
    return "plaintext"
  }

  return (
    <div className="h-full flex flex-col">
      <div className="h-10 border-b border-border flex items-center px-4 bg-card">
        <span className="text-sm text-foreground">{file.name}</span>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={getLanguage(file.name)}
          value={file.content || ""}
          onChange={(value) => onChange(value || "")}
          theme={theme === "dark" ? "vs-dark" : "light"}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  )
}
