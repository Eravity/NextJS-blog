export default function AboutPage() {
  return (
    <div className="container-main">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-xl mb-8">About Task Manager</h1>
        
        <div className="space-y-8">
          <div className="modern-card">
            <h2 className="heading-md mb-4">What is Task Manager?</h2>
            <div className="text-body space-y-4">
              <p>
                Task Manager is a modern, minimalist task management application designed to help you 
                stay organized and productive. Built with Next.js and powered by a MongoDB backend, 
                it offers a clean, dark-themed interface that&apos;s easy on the eyes.
              </p>
              <p>
                Whether you&apos;re managing daily tasks, weekly projects, or monthly goals, our application 
                provides the tools you need to track your progress and stay motivated.
              </p>
            </div>
          </div>

          <div className="modern-card">
            <h2 className="heading-md mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-200 mb-2">📝 Task Management</h3>
                <p className="text-body text-sm">Create, edit, and organize your tasks with detailed descriptions and due dates.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-200 mb-2">🔄 Recurring Tasks</h3>
                <p className="text-body text-sm">Set up daily, weekly, or monthly recurring tasks to maintain consistency.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-200 mb-2">🎯 Progress Tracking</h3>
                <p className="text-body text-sm">Monitor your productivity with completion statistics and progress indicators.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-200 mb-2">⚡ Reward System</h3>
                <p className="text-body text-sm">Earn experience points and coins for completing tasks to stay motivated.</p>
              </div>
            </div>
          </div>

          <div className="modern-card">
            <h2 className="heading-md mb-4">Technology Stack</h2>
            <div className="text-body space-y-2">
              <p><strong className="text-neutral-200">Frontend:</strong> Next.js 15, React, TypeScript, Tailwind CSS</p>
              <p><strong className="text-neutral-200">Backend:</strong> MongoDB with custom API</p>
              <p><strong className="text-neutral-200">Authentication:</strong> JWT-based secure authentication</p>
              <p><strong className="text-neutral-200">Deployment:</strong> Optimized for modern web standards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
