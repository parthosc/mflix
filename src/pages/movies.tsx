import { useRouter } from "next/router";
import clientPromise from "@/lib/mongodb";

export default function Movies({ movies }: { movies: any }) {
  const router = useRouter();

  return (
    <div>
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {movies.map((movie: any) => (
          <li key={movie.title}>
            <h2>{movie.title}</h2>
            <p>{movie.plot}</p>
            <button
              type="button"
              onClick={() =>
                router.push(`/movies/${movie.title.replaceAll(" ", "-")}`)
              }
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    return {
      props: { movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (e) {
    console.error(e);
  }
}
