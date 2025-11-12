export async function handler(event, context) {
  const query = event.queryStringParameters.query;
  const apiKey = process.env.API_KEY;

  console.log("🔑 API Key exists?", !!apiKey);
  console.log("🔍 Query:", query);

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not found in environment" }),
    };
  }

  try {
    const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
      headers: { "X-Api-Key": apiKey },
    });

    const data = await response.json();
    console.log("📦 API Response:", data);

    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch nutrition data" }) };
  }
}
