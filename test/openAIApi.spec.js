import { communicateWithOpenAI } from "../src/lib/openAIApi.js";

describe("communicateWithOpenAI", () => {
  const theExpectedApiResponse = { text: "hola, soy Hackers ¿en qué te puedo ayudar?" }; 

  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(theExpectedApiResponse),
  });

  test("responde de manera esperada", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(theExpectedApiResponse),
    });
    const response = await communicateWithOpenAI("Hola", "Hackers", fetchMock);
    const data = await response.json();
    expect(data).toEqual(theExpectedApiResponse);
  });

  test("construye correctamente la solicitud a la API de OpenAI", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({}),
    });
    global.fetch = fetchMock;

    const input = "Hola";
    const cardId = { name: "Película de prueba" };

    await communicateWithOpenAI(input, cardId);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": expect.any(String),
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: `Tú eres este film relacionado a la tecnología: ${cardId.name}. Responde en primera persona. Tienes acceso a chats y respuestas anteriores. Mantendrás la conversación lo más corta posible. No repitas tu nombre después de iniciada la conversación, solo responde puntualmente a cada pregunta. Nunca preguntes ¿En qué más puedo ayudarte hoy? o sus variantes. Tendrás una personalidad pragmática por lo cual solo responderás sin ofrecer ayuda, nunca preguntarás ¿En qué puedo ayudarte hoy?.` },
            { role: "user", content: input },
          ],
        }),
      }
    );
  });
});
