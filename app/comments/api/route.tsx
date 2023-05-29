// GET /comments/api
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
    const response = await fetch('https://api.airtable.com/v0/appBDIWPFLg0qOQIl/comments', {
        headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
        },
        next: {
            // revalidate: 10,
            revalidate: 0,
        }
    });
    const data = await response.json();

    return NextResponse.json(data.records);
}

export async function POST(request: NextRequest) {
    const responseData = await request.json();
    console.log('Plain data: ', responseData);

    const response = await fetch('https://api.airtable.com/v0/appBDIWPFLg0qOQIl/comments', {
        headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            records: [{
                fields: {
                    content: responseData.commentContent
                }
            }]
        }),
    });
    const data = await response.json();

    return NextResponse.json(data);
}
