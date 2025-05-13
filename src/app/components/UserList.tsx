"use client";

import { useOthers,useSelf } from "../liveblocks.config";
export function UserList() {
    const others = useOthers();
    const me = useSelf();
  
    // Calculate total users (others + yourself)
    const totalUsers = others.length + (me ? 1 : 0);
  
    return (
      <div className="flex items-center space-x-2">
        <div className="flex -space-x-2">
          {/* Show current user first */}
          {me && (
            <div
              className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white relative group"
              style={{ backgroundColor: me.presence.color }}
              title={`${me.presence.name} (You)`}
            >
              {me.presence.name.charAt(0).toUpperCase()}
            </div>
          )}
          {/* Show other users */}
          {others.map(({ connectionId, presence }) => (
            <div
              key={connectionId}
              className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white relative group"
              style={{ backgroundColor: presence.color }}
              title={presence.name}
            >
              {presence.name.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {totalUsers} {totalUsers === 1 ? "person" : "people"} online
        </span>
      </div>
    );
  }