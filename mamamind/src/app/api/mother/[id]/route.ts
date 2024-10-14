const baseUrl = process.env.BASE_URL;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  console.log({ baseUrl });

  if (!id || isNaN(Number(id))) {
    return new Response('Valid Mother ID is required', {
      status: 400, 
    });
  }

  try {
    const res = await fetch(`${baseUrl}/api/mothers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Fetch Response:', res);

    if (!res.ok) {
      return new Response(`Error: ${res.statusText}`, {
        status: res.status,
      });
    }

    const motherData = await res.json();
    return new Response(JSON.stringify(motherData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching mother data:', error);

    return new Response(`Server error: ${(error as Error).message}`, {
      status: 500,
    });
  }
}