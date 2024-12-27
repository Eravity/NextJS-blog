"use client";
import { useState } from "react";

export default function Counter() {
  const [time, setTime] = useState(0);
  setTimeout(() => setTime(time + 1), 1000);
  return (
    <>
      <div>This page was opened {time} seconds ago.</div>
    </>
  );
}
