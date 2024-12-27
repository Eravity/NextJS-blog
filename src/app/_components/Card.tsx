type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return <div className="border border-neutral-700 rounded-lg p-3">{children}</div>;
}
