import { NextRequest, NextResponse } from "next/server";
import { requestTrace } from "../common";

async function makeRequest(req: NextRequest) {
  try {
    const api = await requestTrace(req);
    const traceText = await api.text();
    const traceArr = traceText.split("\n");
    const fields: Record<string, string> = {};
    traceArr.forEach((item) => {
      const field = item.split("=");
      fields[field[0]] = field[1];
    });
    return NextResponse.json(fields);
  } catch (e) {
    console.error("[OpenAI] ", req.body, e);
    return NextResponse.json(
      {
        error: true,
        msg: JSON.stringify(e),
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  return makeRequest(req);
}

export async function GET(req: NextRequest) {
  return makeRequest(req);
}
