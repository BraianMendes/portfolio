import { title } from "@/components/primitives";

export default function BlogPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <h1 className={title()}>Blog</h1>
      <p className="mt-6 text-lg text-gray-400 text-center max-w-md">
        Soon I’ll share thoughts, studies, and experiences on technology, career, and lifelong learning here.<br />
        <span className="text-primary-400">Page under construction.</span>
      </p>
    </div>
  );
}
