"use server";

import { db } from "../db";
import { InsertChat, chatTable } from "../schema/chat-schema";

export const saveChatMessage = async (data: InsertChat) => {
  if (!data.userMessage || !data.botResponse) {
    throw new Error("Message and response are required");
  }

  try {
    const [newMessage] = await db.insert(chatTable)
      .values(data)
      .returning();
    return newMessage;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to save message to database");
  }
};

export const getChatHistory = async () => {
  try {
    return await db.query.chatTable.findMany({
      orderBy: (messages, { desc }) => [desc(messages.createdAt)]
    });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw new Error("Failed to fetch chat history");
  }
}; 