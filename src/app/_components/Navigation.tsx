import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <Link 
            href="/" 
            className="text-neutral-300 hover:text-white transition-colors duration-200 font-medium"
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            href="/About" 
            className="text-neutral-300 hover:text-white transition-colors duration-200 font-medium"
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            href="/About/Posts" 
            className="text-neutral-300 hover:text-white transition-colors duration-200 font-medium"
          >
            Tasks
          </Link>
        </li>
      </ul>
    </nav>
  );
}
