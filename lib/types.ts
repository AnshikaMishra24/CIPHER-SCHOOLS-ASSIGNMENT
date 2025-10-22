export interface FileNode {
  name: string
  path: string
  type: "file" | "folder"
  content?: string
  children?: Record<string, FileNode>
}

export interface Project {
  id: string
  name: string
  files: Record<string, FileNode>
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  username: string
  projects: string[]
  createdAt: string
}

// MongoDB Schema interfaces for future backend integration
export interface ProjectSchema {
  _id: string
  userId: string
  name: string
  files: Record<string, FileNode>
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserSchema {
  _id: string
  email: string
  username: string
  passwordHash: string
  projects: string[]
  createdAt: Date
  updatedAt: Date
}
