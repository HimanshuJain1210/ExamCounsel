// api/chat.js — Vercel Serverless Function
// Uses Groq API (FREE tier: 14,400 requests/day, 30 req/min on llama-3.3-70b-versatile)
// Model: llama-3.3-70b-versatile — latest stable, NOT deprecated
// Get your free key at: https://console.groq.com/keys

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY not configured in Vercel environment variables." });
  }

  try {
    const body = {
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: system || "You are a helpful exam counsellor for Indian engineering students.",
        },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    };

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!groqRes.ok) {
      const errData = await groqRes.json().catch(() => ({}));
      console.error("Groq API error:", errData);
      return res.status(502).json({ error: "Groq API returned an error.", detail: errData });
    }

    const data = await groqRes.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response. Please try again.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Failed to reach Groq API." });
  }
}
