'use client'

import { useState } from "react";
import NewPostForm from "./NewPostForm";

export default function PostsList({ children }: { children: React.ReactNode }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl">Posts</h1>
        <button 
          className="px-3 py-1 bg-amber-500 rounded font-semibold" 
          onClick={() => setShowForm(true)}
        >
          New
        </button>
        {showForm && <NewPostForm id="newPost" onClose={() => setShowForm(false)} />}
      </div>
      {children}
    </div>
  );
}
