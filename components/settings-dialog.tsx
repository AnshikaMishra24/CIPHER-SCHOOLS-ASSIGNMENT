"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  autoSave: boolean
  onAutoSaveChange: (enabled: boolean) => void
  theme: "dark" | "light"
  onThemeChange: () => void
}

export default function SettingsDialog({
  open,
  onOpenChange,
  autoSave,
  onAutoSaveChange,
  theme,
  onThemeChange,
}: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Customize your CipherStudio experience</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Editor</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autosave">Auto Save</Label>
                <p className="text-xs text-muted-foreground">Automatically save changes after 2 seconds</p>
              </div>
              <Switch id="autosave" checked={autoSave} onCheckedChange={onAutoSaveChange} />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Appearance</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme">Dark Mode</Label>
                <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
              </div>
              <Switch id="theme" checked={theme === "dark"} onCheckedChange={onThemeChange} />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">About</h3>
            <p className="text-xs text-muted-foreground">CipherStudio v1.0.0</p>
            <p className="text-xs text-muted-foreground">A modern browser-based React IDE</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
