import { Suspense } from "react";
import Items from "@/app/_components/Items";
import PostsList from "@/app/_components/PostsList";

export default function ProjectsPage() {
  return (
    <PostsList>
      <Suspense fallback={<div>Loading Items...</div>}>
        <Items />
      </Suspense>
    </PostsList>
  );
}