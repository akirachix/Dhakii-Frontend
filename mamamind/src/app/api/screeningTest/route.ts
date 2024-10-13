
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const response = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/screeningtestscore/');
    if (!response.ok) {
      throw new Error('Failed to fetch scores');
    }

    const patients = await response.json();
    return NextResponse.json(patients); 
  } catch (error) {
    console.error('Error fetching scores:', error);
    return NextResponse.json({ error: 'Failed to fetch scores' }, { status: 500 });
  }
}