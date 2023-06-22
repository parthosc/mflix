import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const slug = req.query.slug;
        const name = slug?.toLocaleString().replaceAll("-", " ");
        const client = await clientPromise;
        const db = client.db("sample_mflix");

        const movies: any = await db
            .collection("movies")
            .find({ title: name })
            .sort({ metacritic: -1 })
            .limit(1)
            .toArray();

        return res.json(movies);
    } catch (e) {
        console.error(e);
    }
};