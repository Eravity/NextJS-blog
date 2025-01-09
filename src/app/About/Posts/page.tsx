import { Suspense } from "react";
import type { Metadata } from "next";
import Items from "@/app/_components/Items";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl">Posts</h1>
        <button className="px-3 py-1 bg-amber-500 rounded font-semibold">New</button>
      </div>
      <Suspense fallback={<div>Loading Items...</div>}>
        <Items />
      </Suspense>
    </div>
  );
}
