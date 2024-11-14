// Import NextResponse once
import { NextResponse } from "next/server";

// Define the POST function only once
export async function POST(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const timeoutDuration = 20000;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutDuration);

  try {
    const nurseData = await req.json();

    // Validation for required fields
    const requiredFields = ["firstname", "lastname", "username", "email", "password", "phone_number", "reg_no", "sub_location", "hospital_id"];
    for (const field of requiredFields) {
      if (!nurseData[field]) {
        return NextResponse.json({ error: `${field.replace('_', ' ')} is required` }, { status: 400 });
      }
    }

    if (!baseUrl) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Proceed with user creation
    const userResponse = await fetch(`${baseUrl}/api/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: nurseData.username,
        email: nurseData.email,
        password: nurseData.password,
        phone_number: nurseData.phone_number,
        first_name: nurseData.firstname,
        last_name: nurseData.lastname,
      }),
      signal: controller.signal,
    });

    if (!userResponse.ok) {
      const errorResponse = await userResponse.json();
      return NextResponse.json(
        { error: errorResponse.detail || "Failed to create user" },
        { status: userResponse.status }
      );
    }

    const createdUser = await userResponse.json();
    const nursePayload = { ...nurseData, user: createdUser.id };

    const nurseResponse = await fetch(`${baseUrl}/api/nurses/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nursePayload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!nurseResponse.ok) {
      const errorResponse = await nurseResponse.json();
      return NextResponse.json(
        { error: errorResponse.detail || "Failed to create nurse" },
        { status: nurseResponse.status }
      );
    }

    const nurse = await nurseResponse.json();
    return NextResponse.json(nurse, { status: 201 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Server error or network issue" },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
