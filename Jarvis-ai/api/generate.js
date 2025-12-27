export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { prompt } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    // Kirim hasil dengan nama 'result'
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf Bos, sinyal terganggu.";
    res.status(200).json({ result: resultText });
  } catch (error) {
    res.status(500).json({ error: "Koneksi Stark gagal." });
  }
}
