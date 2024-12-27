'use client'

import { useParams } from "next/navigation";

export default function BlogPage() {
  const params = useParams()
  return <div>Yo! This is the Blog page. {params.slug}</div>;
}