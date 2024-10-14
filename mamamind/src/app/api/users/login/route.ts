

import { NextRequest, NextResponse } from 'next/server';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;  

export async function POST(request: NextRequest) {
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set.');
    return NextResponse.json({ error: 'BASE_URL environment variable is not set.' }, { status: 500 });
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const response = await fetch(`${baseUrl}/api/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result.error || 'Login failed.' }, { status: response.status });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in POST /api/users/login:', error);
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again later.' }, { status: 500 });
  }
}

