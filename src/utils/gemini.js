/**
 * Gemini AI Client (v1beta)
 * Implemented as a secondary fallback provider
 */
export const generateFromGemini = async (prompt) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
  
  if (!apiKey) {
    throw new Error("Gemini API Key is missing");
  }

  // Using v1beta endpoint as requested
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  console.log("[GEMINI] Initiating fallback request...");

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        response_mime_type: "application/json",
      }
    })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("[GEMINI ERROR]", data);
    throw new Error(data.error?.message || `Gemini API error: ${response.status}`);
  }

  try {
    const textResponse = data.candidates[0].content.parts[0].text;
    // Clean potential markdown code blocks if the model includes them
    const cleanJson = textResponse.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error("[GEMINI PARSE ERROR]", err);
    throw new Error("Failed to parse Gemini JSON output");
  }
};
