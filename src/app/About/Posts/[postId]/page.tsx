import { notFound } from "next/navigation";
import { Suspense } from "react";
import TaskDataLoader from "@/app/_components/TaskDataLoader";

interface PageProps {
  params: {
    postId: string;
  };
}

function TaskDetailsLoading() {
  return (
    <div className="container-main">
      <div className="max-w-4xl mx-auto">
        
        {/* Loading Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="w-20 h-6 bg-neutral-700 rounded animate-pulse mb-4"></div>
            <div className="w-32 h-10 bg-neutral-700 rounded animate-pulse"></div>
          </div>
          
          <div className="w-3/4 h-12 bg-neutral-700 rounded animate-pulse mb-4"></div>
          <div className="w-full h-6 bg-neutral-700 rounded animate-pulse mb-2"></div>
          <div className="w-2/3 h-6 bg-neutral-700 rounded animate-pulse"></div>
        </div>

        {/* Loading Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="modern-card">
            <div className="w-32 h-6 bg-neutral-700 rounded animate-pulse mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="w-16 h-4 bg-neutral-700 rounded animate-pulse"></div>
                  <div className="w-24 h-4 bg-neutral-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="modern-card">
            <div className="w-20 h-6 bg-neutral-700 rounded animate-pulse mb-4"></div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-32 h-4 bg-neutral-700 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-neutral-700 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-16 h-4 bg-neutral-700 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-neutral-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page({ params }: PageProps) {
  if (!params.postId) {
    return notFound();
  }

  return (
    <Suspense fallback={<TaskDetailsLoading />}>
      <TaskDataLoader taskId={params.postId} />
    </Suspense>
  );
}
