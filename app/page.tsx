// app/page.tsx
import { Editor } from "./components/DynamicEditor";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Create a New Blog Post</h1>
      {/* Fixed-size container with scrollable content */}
      <div className="w-full h-[900px] overflow-auto border border-gray-300 rounded-lg shadow-sm">
        <Editor />
      </div>
    </div>
  );
}
