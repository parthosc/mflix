import { GetServerSidePropsContext } from "next";
import clientPromise from "../../lib/mongodb";
import { useRouter } from "next/router";

export default function Movies({ movies }: { movies: any }) {
    const router = useRouter()
    return (
        <div>
            <h1>Top 20 Movies of All Time</h1>
            <button type="button" onClick={() => router.back()}>Back</button>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {movies.map((movie: any) => (
                    <li>
                        <h2>{movie.title}</h2>
                        <h3>{movie.metacritic}</h3>
                        <p>{movie.plot}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const slug = context.query.slug;
    const name = slug?.toLocaleString().replaceAll("-", " ");
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");

        const movies = await db
            .collection("movies")
            .find({ title: name })
            .sort({ metacritic: -1 })
            .limit(1)
            .toArray();

        return {
            props: { movies: JSON.parse(JSON.stringify(movies)) },
        };
    } catch (e) {
        console.error(e);
    }
}