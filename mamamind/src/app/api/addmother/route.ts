

import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function POST(request: Request) {
  try {
    const motherData = await request.json();

    // Forward the request to the actual backend API
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

    // Get the newly created mother data
    const newMother = await response.json();

    // Ensure the mother data contains an ID
    if (!newMother.id) {
      throw new Error('The backend did not return a valid mother ID');
    }

    // Return the new mother object back to the front-end
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


