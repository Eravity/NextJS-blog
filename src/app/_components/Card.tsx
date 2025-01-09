import Link from "next/link";

type CardProps = {
  children: React.ReactNode;
  className: string;
  postId: string;
};

export default function Card({ children, className, postId }: CardProps) {
  return (
    <Link href={`/About/Posts/${postId}`}>
    <div
      className={`${className} border border-neutral-700 hover:border-neutral-500 duration-150 rounded-lg p-3`}
    >
      {children}
    </div>
    </Link>
  );
}
