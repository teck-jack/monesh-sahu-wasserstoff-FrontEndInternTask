"use client";

import { useState } from "react";
import { Editor } from "./Editor";
import { UserList } from "./UserList";
import { NameInput } from "./NameInput";

//Main container component that 
// handles: User authentication flow and wrap on editor

export function EditorWrapper() {

   //  tracking  current user's name
  const [name, setName] = useState("");

  if (!name) {
    return <NameInput onJoin={setName} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
        
      <div className="max-w-4xl mx-auto">
         {/*   title and user list show on top */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Collaborative Editor</h1>
          <UserList />
        </div>

         {/* Editor container */}
        <div className="bg-white rounded-lg shadow p-6">
          <Editor name={name} />
        </div>
      </div>
    </div>
  );
}