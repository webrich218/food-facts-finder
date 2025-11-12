export async function handler(event, context) {
  const query = event.queryStringParameters.query;
  const apiKey = process.env.API_KEY;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query parameter" }),
    };
  }

  try {
    const url = `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: { "X-Api-Key": apiKey },
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch nutrition data" }),
    };
  }
}
