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

export function Editor({ name }: EditorProps) {
  // Get the current document from Liveblocks storage
  const document = useStorage((root) => root.document);
  
  // Mutation for updating the shared document
  const updateDocument = useMutation(
    ({ storage }, newContent: string) => {
      storage.set("document", newContent);
    },
    []
  );

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

  const handleChange = useCallback(() => {
    updateMyPresence({ 
      lastChange: Date.now(),
      name: me?.presence.name || name
    });
  }, [updateMyPresence, me?.presence.name, name]);

  // Configure Liveblocks extension for Tiptap
  const liveblocks = useLiveblocksExtension({
    storage: {
      document: {
        type: "string",
        default: "",
      },
    },
    onStorageUpdate: ({ storage }) => {
      const content = storage.document;
      if (content !== editor?.getHTML()) {
        editor?.commands.setContent(content);
      }
    },
  });

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none p-4",
      },
    },
    onUpdate: ({ editor }) => {
      // Update the shared document when local changes occur
      updateDocument(editor.getHTML());
      handleChange();
    },
  });

  // Set initial content
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
