import Link from "next/link";

export default function Page() {
  return (
    <div className="container-main">
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold text-white mb-6">
          Task Manager
        </h1>
        <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
          A modern, minimalist task management application to help you stay organized and productive.
        </p>
        
        <div className="flex justify-center gap-4">
          <Link href="/About/Posts" className="btn-primary text-lg px-8 py-4">
            View Tasks
          </Link>
          <Link href="/About" className="btn-secondary text-lg px-8 py-4">
            Learn More
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20">
        <div className="text-center">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-white mb-2">Simple Task Creation</h3>
          <p className="text-neutral-400">Create and organize tasks with ease using our intuitive interface.</p>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-white mb-2">Track Progress</h3>
          <p className="text-neutral-400">Monitor your productivity with completion stats and rewards.</p>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold text-white mb-2">Stay Motivated</h3>
          <p className="text-neutral-400">Earn XP and coins for completing tasks to stay engaged.</p>
        </div>
      </div>
    </div>
  );
}
