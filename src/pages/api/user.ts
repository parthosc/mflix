import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextRequest, res: NextResponse) {
    res.status(200).json({ name: 'John Doe' })
}