import { NextResponse } from 'next/server';

// GET http://localhost:3000/api
export async function GET(_request: Request) {
    NextResponse.json({ msg: 'OK!' })
}

// POST http://localhost:3000/api
// export async function POST(request: Request, response: Response) {
//     NextResponse.json({ msg: 'success!' });
// }