

// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//   const baseUrl = process.env.BASE_URL;
//   try {
//     const { first_name, last_name, email, password, user_role, phone_number, username } = await request.json();

//     if (!first_name || !last_name || !email || !password || !user_role || !phone_number || !username) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }

//     return NextResponse.json({ message: "User created successfully" }, { status: 201 });
//   } catch (error) {
//     console.error('Error in POST /api/users:', error);
//     return NextResponse.json({ error: (error as Error).message || 'An unexpected error occurred. Please try again.' }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(request: NextRequest) {
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set.');
    return NextResponse.json({ error: 'BASE_URL environment variable is not set.' }, { status: 500 });
  }

  try {
    const { firstname, lastname, email, password, role, phonenumber, username } = await request.json();

    if (!firstname || !lastname || !email || !password || !role || !phonenumber || !username) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const response = await fetch(`${baseUrl}/api/users/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, email, password, role, phonenumber, username }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result.error || 'Signup failed.' }, { status: response.status });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in POST /api/users/signup:', error);
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again later.' }, { status: 500 });
  }
}
