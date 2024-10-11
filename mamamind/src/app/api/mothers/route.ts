
import { NextResponse } from 'next/server';
export async function GET() {
  try {
    const response = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/mothers/');
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


