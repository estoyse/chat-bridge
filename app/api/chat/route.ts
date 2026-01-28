import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: message,
      config: {
        systemInstruction: "You are general LLM assistant",
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    if (!response) {
      throw new Error("OpenAI API error");
    }

    const reply = response.text;

    return NextResponse.json({ message: reply });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
