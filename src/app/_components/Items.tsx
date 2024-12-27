import Card from '@/app/_components/Card';

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
    <div>
      {data.map((repo: Repo) => (
        <div className="mb-4" key={repo.id}>
          <Card>
            <h1 key={repo.title}>{repo.title}</h1>
            <p key={repo.description}>{repo.description}</p>
            <p key={repo.stargazers_count}>{repo.stargazers_count}</p>
          </Card>
        </div>
      ))}
    </div>
  );
}