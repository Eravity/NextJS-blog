import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import ToasterProvider from "./_components/ToasterProvider";
import TokenSetter from "./_components/TokenSetter";

export const metadata: Metadata = {
  title: {
    template: "%s | Task Manager",
    default: "Task Manager",
  },
  description: "A modern task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <ToasterProvider />
        <TokenSetter />
      </body>
    </html>
  );
}
