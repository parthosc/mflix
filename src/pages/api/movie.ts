import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const Movies = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");

        const movies: any = await db
            .collection("movies")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();

        return res.json(movies);
    } catch (e) {
        console.error(e);
    }
};
export default Movies;