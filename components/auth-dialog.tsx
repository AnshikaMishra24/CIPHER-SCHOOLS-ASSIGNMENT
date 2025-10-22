"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAuth: (user: { email: string; username: string }) => void
}

export default function AuthDialog({ open, onOpenChange, onAuth }: AuthDialogProps) {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    setError("")
    // Check localStorage for user
    const users = JSON.parse(localStorage.getItem("cipherstudio-users") || "[]")
    const user = users.find((u: any) => u.email === loginEmail && u.password === loginPassword)

    if (user) {
      localStorage.setItem("cipherstudio-current-user", JSON.stringify(user))
      onAuth({ email: user.email, username: user.username })
      onOpenChange(false)
      setLoginEmail("")
      setLoginPassword("")
    } else {
      setError("Invalid email or password")
    }
  }

  const handleRegister = () => {
    setError("")
    if (!registerEmail || !registerUsername || !registerPassword) {
      setError("All fields are required")
      return
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("cipherstudio-users") || "[]")
    if (users.find((u: any) => u.email === registerEmail)) {
      setError("User already exists")
      return
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: registerEmail,
      username: registerUsername,
      password: registerPassword,
      projects: [],
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("cipherstudio-users", JSON.stringify(users))
    localStorage.setItem("cipherstudio-current-user", JSON.stringify(newUser))

    onAuth({ email: newUser.email, username: newUser.username })
    onOpenChange(false)
    setRegisterEmail("")
    setRegisterUsername("")
    setRegisterPassword("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to CipherStudio</DialogTitle>
          <DialogDescription>Sign in to save your projects to the cloud</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleLogin} className="w-full">
              Sign In
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-username">Username</Label>
              <Input
                id="register-username"
                placeholder="johndoe"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="••••••••"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleRegister} className="w-full">
              Create Account
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
