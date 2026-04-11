/**
 * OpenRouter Client for DeepSeek-V3
 * Managed multi-provider architecture for ThinkLens Pro
 */
export const generateFromOpenRouter = async (prompt, isJson = true) => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173", // Required for some OpenRouter models
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
