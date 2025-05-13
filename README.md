# Real-Time Collaborative Editor


A full-featured collaborative text editor that enables multiple users to edit documents simultaneously with live updates. Built with Next.js, Liveblocks, and Tiptap.

## ✨ Features

- **Real-time collaboration** - See changes from other users instantly
- **Live cursors** - Visual indicators showing who's editing where
- **Rich text editing** - Basic formatting options (bold, italic, headings, etc.)
- **Change tracking** - View recent edits with timestamps
- **Comment threads** - Discuss specific parts of the document
- **User presence** - See who's currently active in the document
- **Responsive design** - Works on desktop and mobile devices

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Real-time**: [Liveblocks](https://liveblocks.io/)
- **Text Editor**: [Tiptap](https://tiptap.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 
- Liveblocks account (free tier available)

### Installation

1. Clone the repository:
   ```bash
   gh repo clone teck-jack/monesh-sahu-wasserstoff-FrontEndInternTask
   
Install dependencies:

bash
npm install

bash
// use this cmd to run it 

npm run dev

Open http://localhost:3000 in your browser

🖥 Usage
First Visit:

Enter your name to join the editor

You'll be assigned a unique color that identifies you

Editing:

Start typing - changes appear instantly for all collaborators

Use the floating toolbar for text formatting

See other users' cursors and selections in real-time

Collaboration:

Click the comment icon to start a discussion thread

View active users in the participant list

Check the "Recent Changes" panel for edit history

📂 Project Structure
collaborative-editor/
├── app/
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main editor page
├── components/
│   ├── Editor.tsx          # Core editor component
│   ├── Cursors.tsx         # Live cursors display
│   ├── ChangeIndicator.tsx # Change history panel
│   ├── Threads.tsx         # Comment threads
│   ├── UserList.tsx        # Active participants list
│   └── NameInput.tsx       # Username prompt
├── liveblocks.config.ts    # Liveblocks configuration
└── public/                 # Static assets

