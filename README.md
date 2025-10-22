# CIPHER-SCHOOLS-ASSIGNMENT
# CipherStudio - Browser-Based React IDE

A modern, powerful browser-based IDE for building React applications with live preview, file management, and cloud sync capabilities.

## Features

### Core Features
- **File Management**: Create, delete, rename, and organize project files
- **Code Editor**: Monaco Editor with syntax highlighting and IntelliSense
- **Live Preview**: Real-time React code execution using Sandpack
- **Save & Load**: Persistent project storage with localStorage
- **Authentication**: User registration and login system
- **Theme Switcher**: Toggle between dark and light modes
- **Auto Save**: Optional automatic project saving

### Additional Features
- Glassmorphism UI design with cyan/blue accents
- Context menu for file operations
- Responsive layout with resizable panels
- Multiple file type support (TypeScript, JavaScript, CSS, HTML)
- User account management with dropdown menu
- Settings dialog for customization

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Code Editor**: Monaco Editor
- **Code Execution**: Sandpack (CodeSandbox)
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Storage**: localStorage (with MongoDB schema ready for backend)
- **Icons**: Lucide React

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000)

### Usage

1. **Create Files**: Click the + button in the file explorer
2. **Edit Code**: Select a file and start coding in the Monaco editor
3. **Live Preview**: See your changes instantly in the preview panel
4. **Save Project**: Click Save in the toolbar (or enable auto-save)
5. **Load Project**: Enter a project ID to load saved projects
6. **Sign In**: Create an account to sync projects (coming soon)

## Future Enhancements

- MongoDB backend integration for cloud storage
- AWS S3 for file storage
- Real-time collaboration
- Project deployment to Vercel
- Git integration
- Terminal emulator
- Package manager integration
- Code snippets library
- Keyboard shortcuts
- Multi-tab editing

## Database Schema (Ready for Backend)

The project includes TypeScript interfaces for MongoDB integration:

- **User Schema**: User accounts with email, username, and project references
- **Project Schema**: Project metadata with file structure and permissions

## License

MIT License - feel free to use this project for learning and development!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
