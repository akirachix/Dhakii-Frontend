
import { NextResponse } from 'next/server';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;


export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/mothers/`);
    if (!response.ok) {
      throw new Error('Failed to fetch mothers');
    }

    const patients = await response.json();
    return NextResponse.json(patients); 
  } catch (error) {
    console.error('Error fetching mothers:', error);
    return NextResponse.json({ error: 'Failed to fetch mothers' }, { status: 500 });
  }
}
