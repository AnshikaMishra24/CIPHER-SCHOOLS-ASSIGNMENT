"use client"

import { Button } from "@/components/ui/button"
import { Save, FolderOpen, Sun, Moon, User, LogOut, Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ToolbarProps {
  projectName: string
  onSave: () => void
  onLoad: (projectId: string) => void
  theme: "dark" | "light"
  onThemeToggle: () => void
  user: { email: string; username: string } | null
  onAuthClick: () => void
  onLogout: () => void
  onSettingsClick: () => void
}

export default function Toolbar({
  projectName,
  onSave,
  onLoad,
  theme,
  onThemeToggle,
  user,
  onAuthClick,
  onLogout,
  onSettingsClick,
}: ToolbarProps) {
  const [loadId, setLoadId] = useState("")

  return (
    <div className="h-14 border-b border-border glass flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-primary">
            <span className="text-primary-foreground font-bold text-sm">CS</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">CipherStudio</h1>
        </div>
        <div className="h-6 w-px bg-border" />
        <span className="text-sm text-muted-foreground">{projectName}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <FolderOpen className="w-4 h-4" />
              Load
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Load Project</DialogTitle>
              <DialogDescription>Enter the project ID to load your saved project</DialogDescription>
            </DialogHeader>
            <div className="flex gap-2">
              <Input
                placeholder="Project ID (e.g., default)"
                value={loadId}
                onChange={(e) => setLoadId(e.target.value)}
              />
              <Button onClick={() => onLoad(loadId)}>Load</Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="h-6 w-px bg-border" />

        <Button variant="ghost" size="sm" onClick={onSettingsClick} className="gap-2">
          <Settings className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={onThemeToggle} className="gap-2">
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        <div className="h-6 w-px bg-border" />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                {user.username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" size="sm" onClick={onAuthClick} className="gap-2">
            <User className="w-4 h-4" />
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
}
