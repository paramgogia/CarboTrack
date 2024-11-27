// pages/api/analyze-carbon.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { text } = req.body;

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Craft the prompt for carbon analysis
    const prompt = `
      Analyze the following text from a receipt or document for carbon emissions and environmental impact.
      Provide:
      1. Estimated carbon footprint in kg CO2e
      2. Brief environmental impact assessment
      3. Three specific recommendations for reducing the carbon footprint
      
      Format the response as JSON with keys: carbonFootprint (number), impact (string), and recommendations (array of strings).
      
      Text to analyze: ${text}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const analysisText = response.text();
    
    // Parse the JSON response
    const analysis = JSON.parse(analysisText);

    return res.status(200).json(analysis);
  } catch (error) {
    console.error('Error analyzing carbon footprint:', error);
    return res.status(500).json({ message: 'Error analyzing carbon footprint' });
  }
}