"use client";

import { useThreads } from "@liveblocks/react/suspense";
import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";

// Handles the display and management of comment threads in the editor

export function Threads({ editor }: { editor: Editor | null }) {

  // Get all active threads from Liveblocks

  const { threads } = useThreads();

  return (
    <>
      {/* Main anchored threads that appear next to content */}
      <div className="anchored-threads">
        <AnchoredThreads 
          editor={editor} 
          threads={threads}
          
        />
      </div>
      {/* Floating threads for mobile/alternative view */}
      <FloatingThreads
        editor={editor}
        threads={threads}
        className="floating-threads"
      />
       {/* Composer for adding new comments */}
      <FloatingComposer 
        editor={editor} 
        className="floating-composer"
      />
    </>
  );
}