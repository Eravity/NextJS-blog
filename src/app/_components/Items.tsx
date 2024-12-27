import Card from "@/app/_components/Card";

type Repo = {
  id: number;
  title: string;
  description: string;
  stargazers_count: number;
};

export default async function Items() {
  const response = await fetch("http://localhost:3001/repos");
  const data = await response.json();

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((repo: Repo) => (
        <div key={repo.id}>
          <Card className="font-mono h-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-semibold">{repo.title}</h1>
              <p>✨{repo.stargazers_count}</p>
            </div>
            <p className="text-neutral-400">{repo.description}</p>
          </Card>
        </div>
      ))}
    </ul>
  );
}
