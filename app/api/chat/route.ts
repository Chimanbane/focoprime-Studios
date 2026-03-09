import { NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();

    let messages = body.messages;

    // aceitar prompt simples
    if (!messages && body.prompt) {
      messages = [
        {
          role: "user",
          content: body.prompt
        }
      ];
    }

    if (!messages) {
      return NextResponse.json(
        { error: "No prompt or messages provided" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API Key não configurada" },
        { status: 500 }
      );
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Erro Groq" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message || "Erro interno" },
      { status: 500 }
    );

  }
}
