type CardProps = {
  children: React.ReactNode;
  className: string;
};

export default function Card({ children, className }: CardProps) {
  return <div className={`${className} border border-neutral-700 rounded-lg p-3`}>{children}</div>;
}
