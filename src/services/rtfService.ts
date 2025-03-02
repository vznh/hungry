// rtfService.ts
// rtf = Raw data to formatted data
import OpenAI from "openai";

const cOpenAI = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function fnParseRecipe(sRawText: string): Promise<string> {
  try {
    const response = await cOpenAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Test",
        },
        {
          role: "user",
          content: sRawText,
        },
      ],
      temperature: 0.2,
    });

    let sFormattedRecipe;
    if (response.choices[0].message.content) {
      sFormattedRecipe = response.choices[0].message.content;
    } else {
      return "LLM did not provide a valid response.";
    }

    return sFormattedRecipe.trim();
  } catch {
    return "Recipe parsing failed.";
  }
}
