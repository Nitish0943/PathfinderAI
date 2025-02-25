import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const chatTable = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  userMessage: text("user_message").notNull(),
  botResponse: text("bot_response").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export type InsertChat = typeof chatTable.$inferInsert;
export type SelectChat = typeof chatTable.$inferSelect; 