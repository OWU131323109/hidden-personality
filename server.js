const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static('public'));

const MODEL = 'gpt-4o-mini';
const ENDPOINT =
  'https://openai-api-proxy-746164391621.us-west1.run.app';

const promptTemplate = fs.readFileSync('prompt.md', 'utf8');

app.post('/api/flower', async (req, res) => {
  try {
    const { purpose, color } = req.body;

    const prompt = promptTemplate
      .replace('${purpose}', purpose)
      .replace('${color}', color);

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    res.json(JSON.parse(data.choices[0].message.content));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () =>
  console.log(`🌷 http://localhost:${PORT}`)
);
