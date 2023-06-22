import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const prismaClient = new PrismaClient();
        const post = await prismaClient.post.create({
            data: {
                title: "HELLO",
                body: "HELLO there"
            }
        })
        return res.json(post);
    } catch (e) {
        console.error(e);
    }
};