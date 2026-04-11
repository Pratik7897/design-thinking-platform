/**
 * OpenRouter Client for DeepSeek-V3
 * Managed multi-provider architecture for ThinkLens Pro
 */
export const generateFromOpenRouter = async (prompt, isJson = true) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey || apiKey === "undefined") {
    console.error("[AI CLIENT ERROR] OpenRouter API Key is MISSING in .env file!");
    throw new Error("API Key Missing");
  }

  console.log(`[AI CLIENT] Headers initialized for ${apiKey.substring(0, 10)}...`);

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin || "http://localhost:5173",
        "X-Title": "ThinkLens Pro"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a Senior Product Strategist at a top-tier consultancy (McKinsey/IDEO). Provide specific, deep, and non-generic insights. Always return strictly valid JSON matching the requested schema."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: isJson ? { type: "json_object" } : undefined
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || `OpenRouter API error: ${res.status}`);
    }

    const content = data.choices[0].message.content;
    
    // Safety check for JSON blocks
    if (isJson) {
      try {
        return JSON.parse(content.replace(/```json|```/g, '').trim());
      } catch (parseErr) {
        console.error("OpenRouter JSON Parse Error:", content);
        throw new Error("AI returned invalid JSON structure");
      }
    }

    return content;

  } catch (error) {
    console.error("[AI CLIENT ERROR] OpenRouter:", error);
    throw error;
  }
};
