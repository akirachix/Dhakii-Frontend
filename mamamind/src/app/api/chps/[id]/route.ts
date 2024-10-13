const baseUrl = process.env.BASE_URL;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return new Response('CHP not found', {
      status: 404,
    });
  }

  try {
    const res = await fetch(`${baseUrl}/api/chps/${id}/`, {
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

    const chpData = await res.json();
    return new Response(JSON.stringify(chpData), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching CHP data:', error);
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}
