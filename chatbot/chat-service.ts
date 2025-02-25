import Together from "together-ai";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { saveChatMessage } from "@/db/queries/chat-queries";

// Initialize Together AI client
const together = new Together({ 
  apiKey: process.env.NEXT_PUBLIC_TOGETHER_API_KEY 
});

// System prompt to guide the AI's responses
const SYSTEM_PROMPT = `You are a professional career mentor and coach. Your responses should:
- Use markdown formatting for better readability
- Include bullet points for lists
- Use bold for important points
- Use headings for sections
- Include code blocks when relevant
- Keep responses structured and clear

Your role is to:
- Provide actionable career advice and guidance
- Help with resume and interview preparation
- Offer industry insights and trends
- Suggest skill development paths
- Give constructive feedback
- Be encouraging but honest
- Keep responses concise and practical

Always maintain a professional, supportive tone while providing specific, actionable advice.`;

// Function to process markdown to HTML
async function processMarkdown(content: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);

  return String(file);
}

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
}

export const getChatbotResponse = async (userMessage: string) => {
  if (!process.env.NEXT_PUBLIC_TOGETHER_API_KEY) {
    throw new Error("TOGETHER_API_KEY is not set in environment variables");
  }

  try {
    // Format the conversation history
    const messages: Message[] = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage }
    ];

    // Get streaming response from Together AI
    const response = await together.chat.completions.create({
      messages,
      model: "meta-llama/Llama-2-70b-chat",
      max_tokens: parseInt(process.env.MAX_TOKENS || "2048"),
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<|eot_id|>", "<|eom_id|>"],
      stream: true,
    });

    // Accumulate the streamed response
    let botResponse = "";
    for await (const token of response) {
      botResponse += token.choices[0]?.delta?.content || "";
    }

    // Process the markdown response to HTML
    const formattedResponse = await processMarkdown(botResponse);

    // Save the conversation to the database
    await saveChatMessage({
      userMessage,
      botResponse: formattedResponse
    });

    return formattedResponse;

  } catch (error) {
    console.error("Error in getChatbotResponse:", error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new Error("Authentication failed. Please check your API key.");
      }
      if (error.message.includes("rate limit")) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
    }
    
    // Generic error
    throw new Error("Failed to get response from AI service");
  }
};

// Helper function to validate message
export const validateMessage = (message: string): string | null => {
  if (!message?.trim()) {
    return "Message cannot be empty";
  }
  if (message.length > 1000) {
    return "Message is too long (max 1000 characters)";
  }
  return null;
};

// Helper function to format messages for the AI
export const formatMessage = (message: string): string => {
  return message.trim().replace(/\n+/g, ' ').slice(0, 1000);
};
