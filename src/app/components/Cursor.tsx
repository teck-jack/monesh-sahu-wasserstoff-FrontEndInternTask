"use client";

type CursorProps = {
  x: number;
  y: number;
  color: string;
  name: string;
};

/**
 * Visual representation of a user's cursor in the editor
 * Shows:
 * - Custom cursor icon
 * - User's name
 * - Color-coded to match user's identity
 */
export function Cursor({ x, y, color, name }: CursorProps) {
  return (
    <div
      className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {/* Custom cursor SVG */}
      <svg
        className="relative"
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        stroke="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      
      {/* User name label */}
      <div
        className="absolute top-5 left-2 rounded px-2 py-1 text-xs text-white whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </div>
  );
}