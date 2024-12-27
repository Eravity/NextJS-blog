import Link from "next/link";

export default function Navigation() {
  const link = "md:p-1 hover:bg-gray-200 hover:text-gray-900 text-2xl md:text-base";
  return (
    <nav className="font-mono">
      <ul className="flex flex-col md:flex-row md:space-x-5">
        <div className={link}>
          <Link href={"/"}>Home</Link>
        </div>
        <li className={link}>
          <Link href={"/About"}>About</Link>
        </li>
        <li className={link}>
          <Link href={"/About/Projects"}>Projects</Link>
        </li>
      </ul>
    </nav>
  );
}
