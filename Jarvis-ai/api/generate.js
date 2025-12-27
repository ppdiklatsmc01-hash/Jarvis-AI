export default async function handler(req, res) {
  // 1. Pastikan hanya menerima metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  // 2. Cek apakah API Key terbaca
  if (!API_KEY) {
    return res.status(500).json({ error: 'API Key tidak ditemukan di Vercel' });
  }

  try {
    // 3. Kirim permintaan ke API Gemini (menggunakan fetch)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });

    const data = await response.json();

    // 4. Kirim hasil kembali ke J.A.R.V.I.S
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      res.status(200).json({ result: data.candidates[0].content.parts[0].text });
    } else {
      res.status(500).json({ error: 'Format respon API tidak sesuai', detail: data });
    }

  } catch (error) {
    res.status(500).json({ error: 'Koneksi ke Gemini gagal', message: error.message });
  }
}
