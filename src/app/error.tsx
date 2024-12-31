"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <h2>
          Something went wrong!
          <br />
          {error.toString()}
        </h2>
      </body>
    </html>
  );
}
