// components/DynamicEditor.tsx
"use client";

import dynamic from "next/dynamic";

// Dynamically import the Editor component with SSR disabled
export const Editor = dynamic(() => import("./Editor"), { ssr: false });