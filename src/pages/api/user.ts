import type { NextResponse, NextRequest } from 'next/server'

export default function handler(req: NextRequest, res: NextResponse) {
    res.status(200).json({ name: 'John Doe' })
}