// api/chat.js — Vercel Serverless Function
// Calls Google Gemini 1.5 Flash (FREE tier: 1,500 requests/day, no credit card needed)
// API key is stored securely in Vercel environment variables — never exposed to students

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured on server." });
  }

  try {
    // Convert messages to Gemini format
    // Gemini uses "user" and "model" (not "assistant")
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const body = {
      system_instruction: {
        parts: [{ text: system || "You are a helpful exam counsellor for Indian engineering students." }],
      },
      contents,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    };

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await geminiRes.json();

    // Extract text from Gemini response
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate a response. Please try again.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err);
    return res.status(500).json({ error: "Failed to reach AI service." });
  }
}
