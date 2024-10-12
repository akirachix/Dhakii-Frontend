const baseUrl = process.env.BASE_URL;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return new Response('Nurse Admin not found', {
      status: 404,
    });
  }

  try {
    const res = await fetch(`${baseUrl}/api/nurse_admins/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return new Response(`Error: ${res.statusText}`, {
        status: res.status,
      });
    }

    const nurseAdminData = await res.json();
    return new Response(JSON.stringify(nurseAdminData), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching Nurse Admin data:', error);
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}
