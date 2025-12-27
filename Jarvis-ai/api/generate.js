export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { prompt } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY; // Kita akan set ini di Vercel nanti

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Kamu adalah J.A.R.V.I.S buatan Tony Stark. Jawablah perintah berikut dengan gaya Jarvis dan berikan kode HTML/CSS jika diminta: ${prompt}` }]}]
      })
    });

    const data = await response.json();
    const answer = data.candidates[0].content.parts[0].text;
    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ answer: "// J.A.R.V.I.S: Sir, I'm having trouble connecting to the servers." });
  }
}
