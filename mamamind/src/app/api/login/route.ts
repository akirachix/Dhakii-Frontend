import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  const baseUrl = process.env.BASE_URL;
  try {
    const { email, password, Username } = await request.json();
    if ( !email || !password ||!Username) {
      console.error('Validation failed: Missing fields');
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }
    const response = await fetch(`${baseUrl}/api/users/login`, {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, Username }),
    });
    const textResponse = await response.text();
    console.log('Backend response:', textResponse, 'Status:', response.status);
    if (!response.ok) {
      try {
        const errorData = JSON.parse(textResponse);
        return NextResponse.json(
          { error: errorData.detail || 'Failed to create user' },
          { status: response.status }
        );
      } catch (e) {
        return NextResponse.json(
          { error: 'Unexpected response format from backend' },
          { status: response.status }
        );
      }
    }
    const result = JSON.parse(textResponse);
    console.log('User created successfully:', result);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
        { error: 'An unexpected error occurred. Please try again later.' },
        { status: 500 }
    );
  }
}
