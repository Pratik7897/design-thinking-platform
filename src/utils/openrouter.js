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
        model: "deepseek/deepseek-chat", // Primary model
        messages: [
          {
            role: "system",
            content: "You are a Senior Product Strategist at IDEO. Provide specific, deep insights. " + (isJson ? "Always return your response as a valid JSON object. Do not include any text outside the JSON structure." : "")
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

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenRouter API error: ${res.status}`);
    }

    const data = await res.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("AI returned an empty response.");
    }
    
    // Safety check for JSON blocks
    if (isJson) {
      try {
        // Find the first '{' and last '}' to extract JSON
        const jsonStart = content.indexOf('{');
        const jsonEnd = content.lastIndexOf('}');
        
        if (jsonStart === -1 || jsonEnd === -1) {
          throw new Error("No JSON object found in response");
        }
        
        const cleanContent = content.substring(jsonStart, jsonEnd + 1);
        return JSON.parse(cleanContent);
      } catch (parseErr) {
        console.error("OpenRouter JSON Parse Error. Original content:", content);
        throw new Error("AI returned invalid JSON structure");
      }
    }

    return content;

  } catch (error) {
    console.error("[AI CLIENT ERROR] OpenRouter:", error);
    throw error;
  }
};
