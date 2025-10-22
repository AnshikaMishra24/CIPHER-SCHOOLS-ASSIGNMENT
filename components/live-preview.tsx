"use client"

import type { FileNode } from "@/lib/types"
import { Sandpack } from "@codesandbox/sandpack-react"
import { useEffect, useState } from "react"

interface LivePreviewProps {
  files: Record<string, FileNode>
  theme: "dark" | "light"
}

export default function LivePreview({ files, theme }: LivePreviewProps) {
  const [sandpackFiles, setSandpackFiles] = useState<Record<string, string>>({})

  useEffect(() => {
    const converted: Record<string, string> = {}
    Object.values(files).forEach((file) => {
      if (file.type === "file" && file.content !== undefined) {
        converted[file.path] = file.content
      }
    })
    setSandpackFiles(converted)
  }, [files])

  return (
    <div className="h-full flex flex-col">
      <div className="h-10 border-b border-border flex items-center px-4 bg-card">
        <span className="text-sm text-foreground">Preview</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <Sandpack
          template="react-ts"
          theme={theme === "dark" ? "dark" : "light"}
          files={sandpackFiles}
          options={{
            showNavigator: false,
            showTabs: false,
            showLineNumbers: true,
            editorHeight: "100%",
            editorWidthPercentage: 0,
          }}
        />
      </div>
    </div>
  )
}
