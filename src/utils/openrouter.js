/**
 * OpenRouter Client - Production Ready
 * ThinkLens Pro - Optimized for stability and variation
 */
export const generateFromOpenRouter = async (prompt, isJson = true) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("[CRITICAL] OpenRouter API Key is missing!");
    throw new Error("MISSING_API_KEY");
  }

  // Timeout logic (15 seconds as requested)
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("TIMEOUT")), 15000)
  );

  const fetchPromise = (async () => {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "ThinkLens Pro"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat", // Primary model
        messages: [
          {
            role: "system",
            content: "You are a senior product strategist and design thinker. Provide deep, mutually exclusive strategic insights. Always return strictly valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8, // Increased for variation
        response_format: isJson ? { type: "json_object" } : undefined
      }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error?.message || `API_ERROR_${res.status}`);
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("EMPTY_RESPONSE");

    if (isJson) {
      try {
        const jsonStart = content.indexOf('{');
        const jsonEnd = content.lastIndexOf('}');
        if (jsonStart === -1 || jsonEnd === -1) throw new Error("INVALID_JSON_STRUCTURE");
        return JSON.parse(content.substring(jsonStart, jsonEnd + 1));
      } catch (err) {
        throw new Error("JSON_PARSE_ERROR");
      }
    }
    return content;
  })();

  return await Promise.race([fetchPromise, timeoutPromise]);
};
