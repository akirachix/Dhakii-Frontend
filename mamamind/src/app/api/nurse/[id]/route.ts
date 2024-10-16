import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return new Response('Nurse not found', {
      status: 404,
    });
  }

  try {
    const response = await fetch(`${baseURL}/api/nurses/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return new Response(`Error: ${response.statusText}`, {
        status: response.status,
      });
    }

    const nurseData = await response.json();

    const mappedNurse = {
      firstname: nurseData.firstname || "",
      lastname: nurseData.lastname || "",
      sub_location: nurseData.sub_location || "",
      reg_no: nurseData.reg_no || "",
      phone_number: nurseData.phone_number || "",
      email: nurseData.email || "",
      gender: nurseData.gender || "",
      username: nurseData.username || "",
    };

    return NextResponse.json(mappedNurse); 
  } catch (error) {
    console.error('Error fetching nurse data:', error);
    return NextResponse.json({ error: 'Failed to fetch nurse data' }, { status: 500 });
  }
}
