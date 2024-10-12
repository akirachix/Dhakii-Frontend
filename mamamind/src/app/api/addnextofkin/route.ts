import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL; 

export async function POST(request: Request) {
  try {
    const nextOfKinData = await request.json(); 

    const response = await fetch(`${baseURL}/api/nextofkins/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nextOfKinData), 
    });

    if (!response.ok) {
      throw new Error('Failed to add next of kin');
    }

    const newNextOfKin = await response.json(); 
    return NextResponse.json(newNextOfKin, { status: 201 });
  } catch (error) {
    console.error('Error adding next of kin:', error);
    return NextResponse.json({ error: 'Failed to add next of kin' }, { status: 500 });
  }
}
