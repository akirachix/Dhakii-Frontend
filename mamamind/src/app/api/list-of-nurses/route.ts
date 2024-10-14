import { Nurse } from "@/app/utils/types";
import { NextResponse } from 'next/server'; // Import necessary Next.js server functions

// const fetchNursesUrl = "https://mamamind-db02af72f48f.herokuapp.com/api/nurses/";
const fetchNursesUrl = process.env.BASE_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  try {
    const response = await fetch(`${fetchNursesUrl}/api/nurses/?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: `Failed to fetch nurses. Status: ${response.status} - ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Log the response to check if `results` exists
    console.log("API Response:", data);

    // Ensure `data.results` exists and is an array
    if (!data.results || !Array.isArray(data.results)) {
      return NextResponse.json(
        { message: "Invalid API response structure: expected `results` to be an array" },
        { status: 500 }
      );
    }

    // Return the mapped nurses and totalPages
    return NextResponse.json({
      nurses: data.results.map((nurse: Nurse) => ({
        firstname: nurse.firstname || "Unknown",
        lastname: nurse.lastname || "Unknown",
        sub_location: nurse.sub_location || "",
        reg_no: nurse.reg_no || "",
      })),
      totalPages: data.total_pages || 1, // Ensure the totalPages is returned from the API
    });

  } catch (error) {
    console.error("Error fetching nurses data:", (error as Error).message || error);
    return NextResponse.json(
      { message: "Failed to fetch nurses" },
      { status: 500 }
    );
  }
}
