
import { NextApiRequest, NextApiResponse } from 'next';
// import { runMiddleware, cors } from "@/app/utils/cors";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // await runMiddleware(req, res, cors);

  try {
    const response = await fetch(`${baseUrl}/api/screeningtestscore/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: `HTTP error! Status: ${response.status}, Message: ${errorText}`,
      });
    }

    const result = await response.json();
    return res.status(200).json({
      message: 'Score data fetched successfully',
      data: result,
    });

  } catch (error) {
    return res.status(500).json({
      error: `Server error: ${(error as Error).message}`,
    });
  }
}

