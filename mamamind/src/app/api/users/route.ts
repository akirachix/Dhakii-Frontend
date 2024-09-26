

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const baseUrl = process.env.BASE_URL;
  try {
    const { first_name, last_name, email, password, user_role, phone_number, username } = await request.json();

    if (!first_name || !last_name || !email || !password || !user_role || !phone_number || !username) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/users:', error);
    return NextResponse.json({ error: (error as Error).message || 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}


