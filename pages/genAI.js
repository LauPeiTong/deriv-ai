// genAI.js
const { GoogleGenerativeAI } = require('@google/generative-ai')

const apiKey = 'YOUR_API_KEY'
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro-002'
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json'
}

async function run (inputText) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [{ text: inputText }]
      }
    ]
  })

  const result = await chatSession.sendMessage(inputText)
  return result.response.text()
}

module.exports = { run }
