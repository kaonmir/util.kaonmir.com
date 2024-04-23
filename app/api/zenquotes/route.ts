import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let response = NextResponse.next();

  try {
    const response = await fetch("https://zenquotes.io/api/today");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from ZenQuotes API:", error);
    return NextResponse.json({
      status: 500,
      body: {
        error: "Unable to fetch data",
      },
    });
  }
}
