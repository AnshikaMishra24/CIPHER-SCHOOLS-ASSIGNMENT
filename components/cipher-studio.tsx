"use client"

import { useState, useEffect } from "react"
import FileExplorer from "./file-explorer"
import CodeEditor from "./code-editor"
import LivePreview from "./live-preview"
import Toolbar from "./toolbar"
import AuthDialog from "./auth-dialog"
import SettingsDialog from "./settings-dialog"
import type { Project } from "@/lib/types"

export default function CipherStudio() {
  const [project, setProject] = useState<Project>({
    id: "default",
    name: "My React App",
    files: {
      "/App.tsx": {
        name: "App.tsx",
        path: "/App.tsx",
        type: "file",
        content: `export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to CipherStudio</h1>
        <p className="text-xl">Start building your React app!</p>
      </div>
    </div>
  )
}`,
      },
      "/styles.css": {
        name: "styles.css",
        path: "/styles.css",
        type: "file",
        content: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`,
      },
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const [activeFile, setActiveFile] = useState<string>("/App.tsx")
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [user, setUser] = useState<{ email: string; username: string } | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [autoSave, setAutoSave] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)

  useEffect(() => {
    const currentUser = localStorage.getItem("cipherstudio-current-user")
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
    const savedAutoSave = localStorage.getItem("cipherstudio-autosave")
    if (savedAutoSave) {
      setAutoSave(JSON.parse(savedAutoSave))
    }
  }, [])

  useEffect(() => {
    if (autoSave) {
      const timer = setTimeout(() => {
        handleSave()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [project, autoSave])

  const handleFileSelect = (path: string) => {
    setActiveFile(path)
  }

  const handleFileCreate = (path: string, type: "file" | "folder") => {
    setProject((prev) => ({
      ...prev,
      files: {
        ...prev.files,
        [path]: {
          name: path.split("/").pop() || "",
          path,
          type,
          content: type === "file" ? "" : undefined,
        },
      },
      updatedAt: new Date().toISOString(),
    }))
  }

  const handleFileDelete = (path: string) => {
    setProject((prev) => {
      const newFiles = { ...prev.files }
      delete newFiles[path]
      return {
        ...prev,
        files: newFiles,
        updatedAt: new Date().toISOString(),
      }
    })
    if (activeFile === path) {
      setActiveFile(Object.keys(project.files)[0] || "")
    }
  }

  const handleFileRename = (oldPath: string, newPath: string) => {
    setProject((prev) => {
      const newFiles = { ...prev.files }
      const file = newFiles[oldPath]
      if (file) {
        newFiles[newPath] = {
          ...file,
          name: newPath.split("/").pop() || "",
          path: newPath,
        }
        delete newFiles[oldPath]
      }
      return {
        ...prev,
        files: newFiles,
        updatedAt: new Date().toISOString(),
      }
    })
    if (activeFile === oldPath) {
      setActiveFile(newPath)
    }
  }

  const handleCodeChange = (code: string) => {
    setProject((prev) => ({
      ...prev,
      files: {
        ...prev.files,
        [activeFile]: {
          ...prev.files[activeFile],
          content: code,
        },
      },
      updatedAt: new Date().toISOString(),
    }))
  }

  const handleSave = () => {
    localStorage.setItem(`cipherstudio-${project.id}`, JSON.stringify(project))
    console.log("[v0] Project saved to localStorage")
  }

  const handleLoad = (projectId: string) => {
    const saved = localStorage.getItem(`cipherstudio-${projectId}`)
    if (saved) {
      const loadedProject = JSON.parse(saved)
      setProject(loadedProject)
      setActiveFile(Object.keys(loadedProject.files)[0] || "")
      console.log("[v0] Project loaded from localStorage")
    }
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const handleAuth = (userData: { email: string; username: string }) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem("cipherstudio-current-user")
    setUser(null)
  }

  const handleAutoSaveChange = (enabled: boolean) => {
    setAutoSave(enabled)
    localStorage.setItem("cipherstudio-autosave", JSON.stringify(enabled))
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Toolbar
        projectName={project.name}
        onSave={handleSave}
        onLoad={handleLoad}
        theme={theme}
        onThemeToggle={toggleTheme}
        user={user}
        onAuthClick={() => setShowAuthDialog(true)}
        onLogout={handleLogout}
        onSettingsClick={() => setShowSettingsDialog(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer */}
        <div className="w-64 border-r border-border glass">
          <FileExplorer
            files={project.files}
            activeFile={activeFile}
            onFileSelect={handleFileSelect}
            onFileCreate={handleFileCreate}
            onFileDelete={handleFileDelete}
            onFileRename={handleFileRename}
          />
        </div>

        {/* Code Editor */}
        <div className="flex-1 border-r border-border">
          <CodeEditor file={project.files[activeFile]} theme={theme} onChange={handleCodeChange} />
        </div>

        {/* Live Preview */}
        <div className="flex-1">
          <LivePreview files={project.files} theme={theme} />
        </div>
      </div>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} onAuth={handleAuth} />
      <SettingsDialog
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
        autoSave={autoSave}
        onAutoSaveChange={handleAutoSaveChange}
        theme={theme}
        onThemeChange={toggleTheme}
      />
    </div>
  )
}
