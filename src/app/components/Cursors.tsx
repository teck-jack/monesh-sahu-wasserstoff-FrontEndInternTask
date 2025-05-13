"use client";

import { useOthers } from "../liveblocks.config";
import { Cursor } from "./Cursor";

/**
 * show all active users' cursors in the editor

 * - Shows real-time positions of collaborators
 * - Handles presence tracking
 * - Filters out users without active cursors
 */
export function Cursors() {
  // Get all other users from Liveblocks
  const others = useOthers();
  
  // Render each user's cursor if they have an active position
  return (
    <>
      {others.map(({ connectionId, presence }) => {
        if (presence.cursor == null) {
          return null;
        }

        return (
          <Cursor
            key={connectionId}
            color={presence.color}
            name={presence.name || "Anonymous"} // Fallback to "Anonymous" if name not set
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        );
      })}
    </>
  );
}