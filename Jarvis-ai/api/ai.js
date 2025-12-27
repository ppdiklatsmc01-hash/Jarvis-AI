export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "You are JARVIS, an AI code generator." },
          { role: "user", content: prompt }
        ],
        temperature: 0.15
      })
    });

    const data = await response.json();
    res.status(200).json({ result: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
