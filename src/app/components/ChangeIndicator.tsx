"use client";

import { useOthers } from "../liveblocks.config";

export function ChangeIndicators() {
    const others = useOthers();
    
    // this is a Filter for users who have made changes and sort by most recent changes
    const usersWithChanges = others
      .filter(user => user.presence.lastChange)
      .sort((a, b) => (b.presence.lastChange || 0) - (a.presence.lastChange || 0));
  
    return (
      <div className="absolute right-4 top-4 bg-white p-2 rounded shadow z-10">
        <h3 className="font-bold mb-2">Recent Changes</h3>
        {usersWithChanges.length > 0 ? (
          <ul className="text-sm">
            {usersWithChanges.map(({ connectionId, presence }) => (
              <li key={connectionId} className="flex items-center mb-1">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: presence.color }}
                />
                <span>
                  {presence.name} edited at {new Date(presence.lastChange!).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No recent changes</p>
        )}
      </div>
    );
  }