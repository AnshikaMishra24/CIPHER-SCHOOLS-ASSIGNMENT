"use client"

import { useState } from "react"
import type { FileNode } from "@/lib/types"
import { File, Folder, Plus, Trash2, Edit2, FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface FileExplorerProps {
  files: Record<string, FileNode>
  activeFile: string
  onFileSelect: (path: string) => void
  onFileCreate: (path: string, type: "file" | "folder") => void
  onFileDelete: (path: string) => void
  onFileRename: (oldPath: string, newPath: string) => void
}

export default function FileExplorer({
  files,
  activeFile,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileRename,
}: FileExplorerProps) {
  const [newFileName, setNewFileName] = useState("")
  const [showNewFileDialog, setShowNewFileDialog] = useState(false)
  const [newFileType, setNewFileType] = useState<"file" | "folder">("file")
  const [renameFile, setRenameFile] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState("")
  const [showRenameDialog, setShowRenameDialog] = useState(false)

  const handleCreateFile = () => {
    if (newFileName) {
      const path = newFileName.startsWith("/") ? newFileName : `/${newFileName}`
      onFileCreate(path, newFileType)
      setNewFileName("")
      setShowNewFileDialog(false)
    }
  }

  const handleRename = () => {
    if (renameFile && renameValue) {
      const newPath = renameValue.startsWith("/") ? renameValue : `/${renameValue}`
      onFileRename(renameFile, newPath)
      setRenameFile(null)
      setRenameValue("")
      setShowRenameDialog(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Files</span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setNewFileType("file")
              setShowNewFileDialog(true)
            }}
            className="h-7 w-7 p-0"
            title="New File"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setNewFileType("folder")
              setShowNewFileDialog(true)
            }}
            className="h-7 w-7 p-0"
            title="New Folder"
          >
            <FolderPlus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {Object.values(files).map((file) => (
          <ContextMenu key={file.path}>
            <ContextMenuTrigger>
              <div
                className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-secondary/50 transition-colors ${
                  activeFile === file.path ? "bg-secondary text-primary" : "text-foreground"
                }`}
                onClick={() => file.type === "file" && onFileSelect(file.path)}
              >
                {file.type === "folder" ? (
                  <Folder className="w-4 h-4 text-primary" />
                ) : (
                  <File className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-sm truncate">{file.name}</span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                onClick={() => {
                  setRenameFile(file.path)
                  setRenameValue(file.path)
                  setShowRenameDialog(true)
                }}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Rename
              </ContextMenuItem>
              <ContextMenuItem onClick={() => onFileDelete(file.path)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>

      <Dialog open={showNewFileDialog} onOpenChange={setShowNewFileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New {newFileType === "file" ? "File" : "Folder"}</DialogTitle>
            <DialogDescription>Enter the name for your new {newFileType}</DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Component.tsx"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateFile()}
            />
            <Button onClick={handleCreateFile}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
            <DialogDescription>Enter the new name for the file</DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., NewComponent.tsx"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
            />
            <Button onClick={handleRename}>Rename</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
