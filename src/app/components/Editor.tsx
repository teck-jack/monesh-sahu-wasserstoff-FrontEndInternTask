"use client";

import { useLiveblocksExtension, FloatingToolbar } from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Threads } from "./Threads";
import { useStorage, useMutation, useSelf, useUpdateMyPresence } from "../liveblocks.config";
import { useCallback, useEffect, useState } from "react";
import { Cursors } from "./Cursors";
import { ChangeIndicators } from "./ChangeIndicator";

type EditorProps = {
  name: string;
};

//
//  editor component its handles:
// Real-time collaboration
// user- tracking
// Change and
// Editor initialization and cleanup
//
export function Editor({ name }: EditorProps) {
  // Get current document content from Liveblocks storage
  const document = useStorage((root) => root.document);
  
  // Mutation for updating the shared document
  const updateDocument = useMutation(
    ({ storage }, newContent: string) => {
      storage.set("document", newContent);
    },
    []
  );

  // Current user's presence data
  const me = useSelf();
  const updateMyPresence = useUpdateMyPresence();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize presence with name and color
  useEffect(() => {
    if (!isInitialized && name) {
      updateMyPresence({ 
        name, 
        color: me?.presence.color || `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`,
        lastChange: Date.now(),
        cursor: null
      });
      setIsInitialized(true);
    }
  }, [name, updateMyPresence, me?.presence.color, isInitialized]);

  // Handler for tracking changes
  const handleChange = useCallback(() => {
    updateMyPresence({ 
      lastChange: Date.now(),
      name: me?.presence.name || name // Ensure name is always set
    });
  }, [updateMyPresence, me?.presence.name, name]);

  // Connect Tiptap to Liveblocks
  const liveblocks = useLiveblocksExtension();

  // Initialize Tiptap editor with storage binding
  const editor = useEditor({
    extensions: [
      liveblocks.configure({
        storage: {
          document: document
        }
      }),
      StarterKit.configure({
        history: false, // Disable local history since we're using Liveblocks
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none p-4",
      },
    },
    onUpdate: ({ editor }) => {
      updateDocument(editor.getHTML());
      handleChange();
    },
  });

  // Set initial content if editor is empty
  useEffect(() => {
    if (editor && document && editor.isEmpty && !editor.isDestroyed) {
      editor.commands.setContent(document);
    }
  }, [editor, document]);

  // Cleanup editor on unmount
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  // Render editor with all collaborative features
  return (
    <div className="relative">
      <ChangeIndicators />
      <Cursors />
      <EditorContent editor={editor} />
      <Threads editor={editor} />
      <FloatingToolbar editor={editor} />
    </div>
  );
}