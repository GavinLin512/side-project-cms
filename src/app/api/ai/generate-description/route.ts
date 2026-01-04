// test CI
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  return NextResponse.json(data);
}
