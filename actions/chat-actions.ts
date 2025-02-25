"use server";

import { getChatbotResponse } from "@/chatbot/chat-service";
import { ActionState } from "@/types";

export async function chatAction(userMessage: string): Promise<ActionState> {
  if (!userMessage?.trim()) {
    return { 
      status: "error", 
      message: "Message is required" 
    };
  }

  try {
    const botResponse = await getChatbotResponse(userMessage);
    return { 
      status: "success", 
      message: "Chatbot response received", 
      data: botResponse 
    };
  } catch (error) {
    console.error("Chat action error:", error);
    return { 
      status: "error", 
      message: "Failed to get chatbot response" 
    };
  }
} 