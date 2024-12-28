import Navigation from "./Navigation";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between md:items-center mt-4">
      <div className="flex items-center md:space-x-12">
        <div className="text-xl hidden md:block">
          <Link className="font-bold" href="/">Cristian Cebotari</Link>
        </div>
        <Navigation />
      </div>
      <div>
        Dark Toggle
      </div>
    </header>
  );
}
