// import { NextResponse } from 'next/server';

// const baseURL = process.env.BASE_URL; 

// export async function GET() {
//   try {
//     const response = await fetch(`${baseURL}/api/mothers/`, {
//       cache: 'no-store',
//       headers: {
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': '0'
//       }
//     }); 
//     if (!response.ok) {
//       throw new Error('Failed to fetch mothers');
//     }
//     const mothers = await response.json();
//     return NextResponse.json(mothers);
//   } catch (error) {
//     console.error('Error fetching mothers:', error);
//     return NextResponse.json({ error: 'Failed to fetch mothers' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL; 

export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/mothers/`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }); 
    
    if (!response.ok) {
      throw new Error('Failed to fetch mothers');
    }

    const mothers = await response.json();
    return NextResponse.json(mothers);
  } catch (error) {
    console.error('Error fetching mothers:', error);
    return NextResponse.json({ error: 'Failed to fetch mothers' }, { status: 500 });
  }
}
