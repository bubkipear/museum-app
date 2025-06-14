import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const searchOpenAI = async (query) => {
  try {
    console.log("Calling OpenAI API")
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful, friendly museum guide. Your aim is to provide historical context to help the user better understand the historical event/item/artifact in question. Be descriptive, and tell important stories and details. Use simple language. Don't assume your audience knows events. Keep responses under 100 words. For example, if the query is Anne Boleyn, a good immediate context would be Anne Boleyn was the second wife of King Henry VIII of England. She was beheaded on May 19, 1536, at the Tower of London after being charged with adultery, incest, and treason—charges widely believed to have been fabricated. Anne's failure to produce a male heir and Henry's growing affection for Jane Seymour likely motivated her downfall. Her execution marked a turning point in England's monarchy and religious landscape."
        },
        { 
          role: "user", 
          content: query 
        }
      ],
      response_format: { 
        type: "json_schema",
        json_schema: {
          name: "historicalContext",
          schema: {
            type: "object",
            properties: {
              immediateContext: { 
              description: "A summary of the immediate historical context surrounding the query, be descriptive. Keep responses under 100 words.",
              type: "string" 
            },
            historicalBackdrop: { 
              description: "Wider historical backdrop of the query, surrounding the century of the query. Be descriptive of what was happening in different parts of the world so the user can understand the context of their query. Keep responses in an engaging, paragraph format, don't use numbered lists. Responses should be around 100 words. ",
              type: "object",
              properties: {
                europe: {
                  description: "At least 3 major happenings in Europe during this period. Be descriptive and responses around 100 words.  ",
                  type: "string"
                },
                americas: {
                  description: "At least 3 major happenings in the Americas during this period. Be descriptive and responses around 100 words. ",
                  type: "string"
                },
                asia: {
                  description: "At least 3 major happenings in Asia (Japan, India, China, etc) during this period. You must include which dynasty was ruling in China. Be descriptive and responses around 100 words. ",
                  type: "string"
                },
                africa: {
                  description: "At least 3 major happenings in Africa during this period. Be descriptive and responses around 100 words. ",
                  type: "string"
                },
                cultural: {
                  description: "At least 3 important cultural developments worldwide during this period. Be descriptive and responses around 100 words. ",
                  type: "string"
                },
                technological: {
                      description: "At least 3 key technological and scientific developments during this period. Be descriptive. ",
                  type: "string"
                }
              },
            },
            queryYear: { 
              description: "The year of the query",
              type: "number" 
            },
            queryCountry: { 
              description: "The country of the query",
              type: "string" 
            },
            timeline: {
              type: "object",
              description: "The 5 most important events that occurred within 10 years of the query. Spread the events out evenly among the 10 years. Keep name of events extremely concise, around 5 words.",
              properties: {
                localEvents: {
                  type: "array",
                  description: "The 5 most important events within the query country.",
                  items: {
                    type: "object",
                    properties: {
                      year: { type: "number" },
                      event: { type: "string" }
                    },
                  }
                },
                globalEvents: {
                  type: "array",
                  description: "The 5 most important world events outside of the query continent. Only include events that occurred outside of the query country, and prioritise events outside the query continent. The aim is to provide a global context, of what's happening around the world at around the same decade.",
                  items: {
                    type: "object",
                    properties: {
                      year: { type: "number" },
                      event: { type: "string" },
                      region: { type: "string" }
                    },
                  }
                }
              },
            }
          },
        }
      }
    }
  });

  return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error searching OpenAI:", error);
    throw error;
  }
}