import { Suspense } from "react";
import type { Metadata } from "next";
import Items from "@/app/_components/Items";

export const metadata: Metadata = {
  title: "Projects",
}; 

export default async function ProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl mb-8">Projects</h1>
      <Suspense fallback={<div>Loading Items...</div>}>
        <Items />
      </Suspense>
    </div>
  );
}
