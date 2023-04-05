import { NextRequest } from "next/server";

const OPENAI_URL = "api.openai.com";
const DEFAULT_PROTOCOL = "https";
const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;
const BASE_URL_CHAT = process.env.BASE_URL ?? "chat.openai.com";

export async function requestOpenai(req: NextRequest) {
  const apiKey = req.headers.get("token");
  const openaiPath = req.headers.get("path");

  console.log("[Proxy] ", `${PROTOCOL}://${BASE_URL}/${openaiPath}`);

  return fetch(`${PROTOCOL}://${BASE_URL}/${openaiPath}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: req.method,
    body: req.body,
  });
}

export async function requestTrace(req: NextRequest) {
  const url = `${PROTOCOL}://${BASE_URL_CHAT}/cdn-cgi/trace`;
  console.log("[Proxy] ", url);

  return fetch(url, {
    method: "GET",
  });
}
