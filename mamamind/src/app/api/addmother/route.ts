
 

import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function POST(request: Request) {
  try {
    const motherData = await request.json();

    const response = await fetch(`${baseURL}/api/mothers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(motherData),
    });

    if (!response.ok) {
      const errorDetails = await response.text(); 
      throw new Error(`Failed to add mother: ${errorDetails}`);
    }

    const contentType = response.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('Invalid response from server');
    }

    const newMother = await response.json();
    return NextResponse.json(newMother, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding mother:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error occurred:', error);
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
