import { NextResponse, NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
    // console.log('Request: ', request);
    return NextResponse.json({ status: 'ok1' })
}

export async function POST(request: NextRequest) {
    const responseData = await request.json();
    console.log(responseData);
    return NextResponse.json({
        message: "response from server",
        ...responseData
    });
}
