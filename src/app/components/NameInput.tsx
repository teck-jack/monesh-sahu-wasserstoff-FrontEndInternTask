"use client";

import { useUpdateMyPresence } from "../liveblocks.config";
import { useState } from "react";

// login page using name only 

export function NameInput({ onJoin }: { onJoin: (name: string) => void }) {
  const updateMyPresence = useUpdateMyPresence();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
        updateMyPresence({ 
            name: inputValue,
            color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`,
            cursor: null
          });
          onJoin(inputValue);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Join Collaborative Editor</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your name
            </label>
            <input
              id="name"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Join Editor
          </button>
        </form>
      </div>
    </div>
  );
}