/**
 * OpenRouter Client for DeepSeek-V3
 * Managed multi-provider architecture for ThinkLens Pro
 */
export const generateFromOpenRouter = async (prompt, isJson = true) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  // Mandatory debug log as requested
  console.log("API KEY:", apiKey ? (apiKey.substring(0, 10) + "...") : "UNDEFINED");

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
        "HTTP-Referer": window.location.origin,
        "X-Title": "ThinkLens"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a senior product strategist. Provide specific, deep insights. Always return strictly valid JSON."
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
    console.log("OPENROUTER RESPONSE:", data);

    if (!res.ok) {
      console.error("OpenRouter error:", data);
      throw new Error(data.error?.message || `OpenRouter API error: ${res.status}`);
    }

    const content = data.choices[0].message.content;

    if (!content) {
      throw new Error("AI returned an empty response.");
    }
    
    if (isJson) {
      try {
        const jsonStart = content.indexOf('{');
        const jsonEnd = content.lastIndexOf('}');
        if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found");
        return JSON.parse(content.substring(jsonStart, jsonEnd + 1));
      } catch (err) {
        console.error("JSON Parse Error. Content:", content);
        throw new Error("AI returned invalid JSON structure");
      }
    }

    return content;

  } catch (error) {
    console.error("[AI CLIENT ERROR] OpenRouter:", error);
    throw error;
  }
};
