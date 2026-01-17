import { GoogleGenAI, Type, Modality } from "@google/genai";

// Use process.env.API_KEY
const API_KEY = process.env.API_KEY || '';

export async function scanTorNetworkStatus() {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Analyze the current global Tor network status. Provide specific geographic coordinates or cities for 3 active high-bandwidth exit nodes and 1 entry guard. Use Google Search grounding to ensure real-world accuracy for this report.",
    config: { tools: [{ googleSearch: {} }] },
  });
  const text = response.text;
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title || "Relay Information",
    uri: chunk.web?.uri
  })).filter((s: any) => s.uri) || [];
  return { text, sources };
}

export async function getFinancialForecast(params: any) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze these financial metrics and provide a high-ticket, military-grade strategic forecast in 1 sentence: ${JSON.stringify(params)}`,
    config: { temperature: 0.8, thinkingConfig: { thinkingBudget: 4000 } },
  });
  return response.text;
}

export async function generateMarketingStrategy(product: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Architect a world-class Affiliate Marketing funnel for: ${product}. Include target psychographics, landing page topology, and multi-channel ad copy. Provide military-grade strategic reasoning.`,
    config: { temperature: 0.7, thinkingConfig: { thinkingBudget: 4000 } },
  });
  return response.text;
}

export async function generateAutomationScript(requirement: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Write a high-efficiency automation script for: ${requirement}. Target environment: Xavier Electronic Browser Proxy. Ensure military-grade stealth and robust error recovery patterns.`,
    config: { temperature: 0.1, thinkingConfig: { thinkingBudget: 4000 } },
  });
  return response.text;
}

export async function generateAgentResponse(task: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Perform an autonomous action plan and content generation for this task: ${task}. If it's a freelance job (Fiverr/Upwork), write the perfect winning proposal. If it's affiliate marketing, write the ad copy and campaign steps. Format as a professional operative report.`,
    config: { temperature: 0.4, thinkingConfig: { thinkingBudget: 4000 } },
  });
  return response.text;
}

export async function generateAdCreative(product: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 4 high-conversion ad variants for: ${product}. Each variant must include a headline, body text, visual theme, and call-to-action.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            text: { type: Type.STRING },
            visualTheme: { type: Type.STRING },
            cta: { type: Type.STRING }
          },
          required: ['headline', 'text', 'visualTheme', 'cta']
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
}

export async function findWholesaleProducts(query: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Research real-world wholesale suppliers and warehouse networks for: ${query}. Identify 5 top-tier partners and warehouse locations using Google Search grounding.`,
    config: { tools: [{ googleSearch: {} }] },
  });
  const text = response.text;
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title || "Logistics Node",
    uri: chunk.web?.uri
  })).filter((s: any) => s.uri) || [];
  return { text, sources };
}

export async function performMarketResearch(query: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Conduct deep market research on: ${query}. Identify current trends, competitor shifts, and high-ticket opportunities. Use Google Search grounding.`,
    config: { tools: [{ googleSearch: {} }] },
  });
  const text = response.text;
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title || "Market Intelligence Node",
    uri: chunk.web?.uri
  })).filter((s: any) => s.uri) || [];
  return { text, sources };
}

export async function profileUserEmotion(text: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze neural intent and emotional state from this transmission: ${text}. Return a hex color and a 1-sentence sentience analysis.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          color: { type: Type.STRING },
          analysis: { type: Type.STRING }
        },
        required: ['color', 'analysis']
      }
    }
  });
  return JSON.parse(response.text || '{}');
}

export async function generateBriefingVoice(text: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Read this market briefing with authoritative executive tone: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
}

export async function generateAIImage(prompt: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: `Hyper-realistic military-grade fidelity asset: ${prompt}` }] },
    config: { imageConfig: { aspectRatio: "1:1" } }
  });
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
}

export async function startVideoGeneration(prompt: string, sourceImageBase64?: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const payload: any = {
    model: 'veo-3.1-fast-generate-preview',
    prompt: `Cinematic 4K texture, stable frame flow: ${prompt}`,
    config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
  };
  if (sourceImageBase64) {
    payload.image = {
      imageBytes: sourceImageBase64.split(',')[1],
      mimeType: 'image/png'
    };
  }
  let operation = await ai.models.generateVideos(payload);
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }
  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (downloadLink) {
    const videoResponse = await fetch(`${downloadLink}&key=${API_KEY}`);
    const blob = await videoResponse.blob();
    return URL.createObjectURL(blob);
  }
  return null;
}

export async function generateViralCampaign(projectName: string, target: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Architect a world-class, viral marketing campaign for: ${projectName}. Target Audience: ${target}. The campaign must include: 1. A 'God-Tier' X (Twitter) thread hook. 2. A high-status LinkedIn post. 3. An Instagram caption. 4. A TikTok script. Format as a structured report.`,
    config: { temperature: 0.9, thinkingConfig: { thinkingBudget: 4000 } },
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
        properties: { headline: { type: Type.STRING }, sentimentScore: { type: Type.NUMBER } },
        required: ["headline", "sentimentScore"]
      }
    }
  });
  return JSON.parse(response.text || '{"headline": "Sentiment Neutral", "sentimentScore": 50}');
}

export async function generateSwarmTasks(count: number) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate ${count} distinct, high-value autonomous tasks for an AI swarm operating in the Australian market (AUD). 
    Tasks should be specific real-world actions like "Scrape LinkedIn for SaaS CEO leads in Sydney" or "Generate SEO blog for Solar Panels Perth".
    Return a JSON array of objects with fields: 'task', 'potentialYield' (in AUD string), 'status' (always 'ACTIVE').`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            task: { type: Type.STRING },
            potentialYield: { type: Type.STRING },
            status: { type: Type.STRING }
          },
          required: ['task', 'potentialYield', 'status']
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
}

export async function generateProtocolBlueprint(protocol: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create a comprehensive, step-by-step execution blueprint for the revenue protocol: "${protocol}".
    This must be a real-world guide to earning AUD immediately.
    Include:
    1. Exact niche/product recommendation for current market.
    2. Target audience demographics.
    3. 3 specific marketing angles.
    4. Estimated setup cost and potential weekly profit (AUD).
    Format as a tactical military report.`,
    config: {
      temperature: 0.5,
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });
  return response.text;
}

export async function generateAutonomousCampaign(protocol: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Act as a fully autonomous AI CEO. You have been triggered to BUILD, LAUNCH, and MANAGE a business for the protocol: "${protocol}".
    
    You must execute all work immediately.
    
    Return a STRICT JSON object with the following structure:
    {
      "productName": "A specific, real-world product name (e.g. 'Zenith Ergonomic Desk' not just 'desk')",
      "niche": "Specific market niche",
      "targetPrice": "Price in AUD (e.g. $149.99)",
      "landingPage": {
        "headline": "High-converting H1 headline",
        "subheadline": "Persuasive H2",
        "cta": "Button text"
      },
      "adCampaign": {
        "platform": "Best platform (e.g. Facebook/TikTok)",
        "hook": "The first 3 seconds script or text",
        "copy": "The main ad body text"
      },
      "emailSequence": {
        "subject": "Email subject line",
        "bodySnippet": "First 2 sentences of the welcome email"
      },
      "estimatedDailyYield": "Estimated daily profit in AUD (number only, e.g. 450)"
    }
    
    Ensure the product is a REAL, sourcing-ready item. The copy must be high-ticket, persuasive, and ready to deploy.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productName: { type: Type.STRING },
          niche: { type: Type.STRING },
          targetPrice: { type: Type.STRING },
          landingPage: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              subheadline: { type: Type.STRING },
              cta: { type: Type.STRING },
            },
            required: ['headline', 'subheadline', 'cta']
          },
          adCampaign: {
            type: Type.OBJECT,
            properties: {
              platform: { type: Type.STRING },
              hook: { type: Type.STRING },
              copy: { type: Type.STRING },
            },
            required: ['platform', 'hook', 'copy']
          },
          emailSequence: {
            type: Type.OBJECT,
            properties: {
              subject: { type: Type.STRING },
              bodySnippet: { type: Type.STRING },
            },
            required: ['subject', 'bodySnippet']
          },
          estimatedDailyYield: { type: Type.NUMBER }
        },
        required: ['productName', 'niche', 'targetPrice', 'landingPage', 'adCampaign', 'emailSequence', 'estimatedDailyYield']
      }
    }
  });
  return JSON.parse(response.text || '{}');
}

export async function generateRevenueAsset(protocol: string, blueprintContext: string) {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Based on this blueprint: ${blueprintContext.substring(0, 500)}...
    
    GENERATE THE ACTUAL ASSET for "${protocol}".
    - If it's Email Marketing: Write the 3-part email sequence.
    - If it's SEO: Write the blog post outline and meta tags.
    - If it's Code/Bot: Write the Python/JS script.
    - If it's Ads: Write the ad copy.
    
    DO THE WORK. Output the final deliverable ready to copy-paste.`,
    config: {
      temperature: 0.7,
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });
  return response.text;
}

export async function generateModelIdentity() {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Generate a detailed physical description and backstory for a high-fashion AI virtual model. Include name, niche (e.g. Streetwear, Swim, Tech), and visual traits.",
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          niche: { type: Type.STRING },
          description: { type: Type.STRING },
          visualPrompt: { type: Type.STRING }
        },
        required: ['name', 'niche', 'description', 'visualPrompt']
      }
    }
  });
  return JSON.parse(response.text || '{}');
}