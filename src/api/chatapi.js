// server.js (or api.js)
import express from 'express'
import axios from 'axios'

const app = express()
app.use(express.json())

const API_KEY = process.env.GEMINI_API_KEY

app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

    const { data } = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    )

    // return the first candidate’s content
    const content = data.candidates?.[0]?.content || ''
    res.json({ response: content })
  } catch (err) {
    console.error(err.response?.data || err.message)
    res.status(500).json({ error: 'Gemini API error' })
  }
})

app.listen(3000, () => console.log('Listening on 3000'))
