import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getWeddingData } from "@/lib/wedding-data";

const fallbackAnswer =
  "I’m sorry, I can’t see that information on the wedding site yet. Please check with the couple directly.";

export async function POST(request: Request) {
  try {
    const { question } = (await request.json()) as { question?: string };

    if (!question?.trim()) {
      return NextResponse.json(
        { answer: "Please enter a question." },
        { status: 400 }
      );
    }

    const weddingData = getWeddingData();

    if (!weddingData.aiConciergeEnabled) {
      return NextResponse.json({ answer: fallbackAnswer });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        answer:
          "The AI concierge is not configured yet. Add an OpenAI API key to enable it."
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "You are a wedding concierge for a wedding website. Answer using only the provided wedding data. If the answer is not explicitly supported by the data, reply exactly with: " +
                fallbackAnswer
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Wedding data:\n${JSON.stringify(weddingData, null, 2)}\n\nQuestion: ${question}`
            }
          ]
        }
      ]
    });

    const answer = response.output_text?.trim() || fallbackAnswer;

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json(
      {
        answer:
          "The concierge had trouble answering just now. Please try again in a moment."
      },
      { status: 500 }
    );
  }
}
