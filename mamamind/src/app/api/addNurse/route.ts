import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const baseUrl = process.env.BASE_URL;
  const timeoutDuration = 20000; 

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutDuration);

  try {
    const nurseData = await req.json();
    console.log("Received nurse data:", nurseData);

    if (!baseUrl) {
      console.error("BASE_URL is not defined in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const userData = {
      username: nurseData.username,
      email: nurseData.email,
      password: nurseData.password,  
      phone_number: nurseData.phone_number  
    };
    
    const userResponse = await fetch(`${baseUrl}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      signal: controller.signal, 
    });

    if (!userResponse.ok) {
      const errorResponse = await userResponse.json();
      console.error("Error creating user:", errorResponse);
      return NextResponse.json(
        { error: errorResponse.detail || "Failed to create user" },
        { status: userResponse.status }
      );
    }

    const createdUser = await userResponse.json();
    console.log("User created successfully:", createdUser);

    const nursePayload = {
      ...nurseData,
      user: createdUser.id, 
    };

    const nurseResponse = await fetch(`${baseUrl}/api/nurses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nursePayload),
      signal: controller.signal, 
    });

    clearTimeout(timeout);

    if (!nurseResponse.ok) {
      const errorResponse = await nurseResponse.json();
      console.error("Error creating nurse:", errorResponse);
      return NextResponse.json(
        { error: errorResponse.detail || "Failed to create nurse" },
        { status: nurseResponse.status }
      );
    }

    const result = await nurseResponse.json();
    console.log("Nurse created successfully:", result);
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("Detailed error:", error);
    
    if (error.name === "AbortError") {
      console.error("Fetch aborted due to timeout");
      return NextResponse.json(
        { error: "Request timed out. Please try again." },
        { status: 504 }
      );
    }

    console.error("Internal Server Error:", error.message || error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
