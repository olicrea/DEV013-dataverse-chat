import { getApiKey } from "./../lib/apiKeyFunction.js";

export const communicateWithOpenAI = (input, cardId) => {
  // Obtener la clave de API
  const apiKey = getApiKey();

  // URL de la API de OpenAI
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  // Llamada a la API de OpenAI
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: `Tú eres este film relacionado a la tecnología: ${cardId.name}. Responde en primera persona. Tienes acceso a chats y respuestas anteriores. Mantendrás la conversación lo más corta posible. No repitas tu nombre después de iniciada la conversación, solo responde puntualmente a cada pregunta. Nunca preguntes ¿En qué más puedo ayudarte hoy? o sus variantes. Tendrás una personalidad pragmática por lo cual solo responderás sin ofrecer ayuda, nunca preguntarás ¿En qué puedo ayudarte hoy?.` },
        { role: 'user', content: input }
      ]
    }),
  })
};
