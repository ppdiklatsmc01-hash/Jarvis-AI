export default async function handler(req, res) {
  const { prompt } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY; 
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Kamu adalah J.A.R.V.I.S. Jawablah perintah ini: ${prompt}` }]}]
      })
    });
    const data = await response.json();
    res.status(200).json({ answer: data.candidates[0].content.parts[0].text });
  } catch (e) {
    res.status(500).json({ answer: "Sir, connection failed." });
  }
}
