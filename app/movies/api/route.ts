import { NextResponse } from 'next/server';

export async function GET() {
    const response = await fetch('https://api.airtable.com/v0/appBDIWPFLg0qOQIl/movies', {
        headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
        }
    });
    const data = await response.json();

    return NextResponse.json(data.records);
}