import Navigation from "./Navigation";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container-main">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              Task Manager
            </Link>
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}
