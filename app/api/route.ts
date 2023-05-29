import { NextResponse, NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
    // console.log('Request: ', request);
    return NextResponse.json({ status: 'ok' })
}

export async function POST(request: Request) {
    const responseData = await request.json();
    console.log(responseData);
    return NextResponse.json(responseData);
}
