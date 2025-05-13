import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

/**
 * Creates the Liveblocks  with your public API key
 */
const client = createClient({
  publicApiKey: "pk_dev_DFwAwbGKw3X9abH_YV_6SNMjJYyEU5XgHhPzXU52AJzNZbBaGt5b4EM9hZPTqEwj",
});

// types

type Presence = {
  lastChange?: number;       
  cursor: { x: number; y: number } | null;  
  name: string;             
  color: string;            
};

// Type definition for Storage:

type Storage = {
  document: string;  //  actual content 
};


 // Type definition for User Metadata:

type UserMeta = {
  id: string;       // Unique  identifier
  info: {
    name: string;   // User name
    color: string;  // User color
  };
};


type ThreadMetadata = {
  resolved: boolean;  
};

/**
 * Creates and exports the Liveblocks context with all typed hooks
 * This provides type-safe access to Liveblocks functionality throughout the app
 */
export const {
  RoomProvider,        // Context provider for Liveblocks room
  useOthers,           // Hook to access other users' presence data
  useUpdateMyPresence, // Hook to update current user's presence
  useStorage,          // Hook to access shared storage
  useMutation,         // Hook to modify shared storage
  useSelf,             // Hook to access current user's data
  useThreads,          // Hook to manage comment threads
} = createRoomContext<Presence, Storage, UserMeta, ThreadMetadata>(client);