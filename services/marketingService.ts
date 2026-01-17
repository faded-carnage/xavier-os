import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export async function generateViralCampaign(projectName: string, target: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Architect a world-class, viral marketing campaign for: ${projectName}. 
    Target Audience: ${target}.
    The campaign must include:
    1. A 'God-Tier' X (Twitter) thread hook and structure.
    2. A high-status LinkedIn 'Authority' post.
    3. An Instagram 'Aesthetic Dominance' caption.
    4. A TikTok 'Pattern Interrupt' script.
    Use military-grade psychological triggers: Scarcity, Authority, and Tribalism. 
    Format the response as a structured report.`,
    config: {
      temperature: 0.9,
      thinkingConfig: { thinkingBudget: 4000 }
    },
  });
  return response.text;
}

export async function getGlobalSentiment() {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Simulate current global internet sentiment towards 'Sovereign AI Ecosystems'. Return a 1-sentence headline and a percentage of positive sentiment.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          sentimentScore: { type: Type.NUMBER }
        },
        required: ["headline", "sentimentScore"]
      }
    }
  });
  return JSON.parse(response.text || '{"headline": "Sentiment Neutral", "sentimentScore": 50}');
}