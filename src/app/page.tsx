"use client";

import { RoomProvider } from "../app/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { Loading } from "../../src/app/components/Loading";
import { EditorWrapper } from "../../src/app/components/EditorWrapper";
import { Suspense } from "react";

export default function Home() {
  return (
    <RoomProvider 
      id="collaborative-editor-room" 
      initialPresence={{ 
        cursor: null, 
        name: "Anonymous", 
        color: getRandomColor() // Move random color generation to a function
      }}
      initialStorage={{ document: "" }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => (
          <Suspense fallback={<Loading />}>
            <EditorWrapper />
          </Suspense>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

// Helper function to generate random colors
function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`;
}