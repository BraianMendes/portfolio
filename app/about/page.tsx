import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <h1 className={title()}>About</h1>
      <p className="mt-6 text-lg text-gray-400 text-center max-w-md">
        Hello! I’m Braian, a software engineer passionate about technology,
        knowledge sharing, and creative problem-solving.
        <br />
        This page will soon be updated with more about my journey, experience,
        and what inspires me.
      </p>
    </div>
  );
}
