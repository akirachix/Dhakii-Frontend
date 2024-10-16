import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const response = await fetch(`${baseURL}/nextofkins/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch next of kin details');
    }

    const nextOfKinData = await response.json();
    return NextResponse.json(nextOfKinData, { status: 200 });
  } catch (error) {
    console.error('Error fetching next of kin:', error);
    return NextResponse.json({ error: 'Failed to fetch next of kin' }, { status: 500 });
  }
}
