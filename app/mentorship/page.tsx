"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chatAction } from "@/actions/chat-actions";
import Together from "together-ai";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const together = new Together({ apiKey: process.env.NEXT_PUBLIC_TOGETHER_API_KEY });

type Message = {
  text: string;
  sender: "user" | "bot";
};

export default function Mentorship() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your AI career assistant. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await together.chat.completions.create({
        messages: messages.map((msg) => ({ role: msg.sender, content: msg.text })),
        model: "meta-llama/Llama-Vision-Free",
        max_tokens: null,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        stop: ["<|eot_id|>", "<|eom_id|>"],
        stream: true,
      });

      let botResponse = "";
      for await (const token of response) {
        botResponse += token.choices[0]?.delta?.content || "";
      }

      const botMessage: Message = { text: botResponse, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. Please try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">AI Career Assistant</h1>
        <Card>
          <CardHeader>
            <CardTitle>Chat with your AI Mentor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] overflow-y-auto mb-4 space-y-4 p-4">
              {messages.map((message, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`rounded-xl p-3 max-w-[70%] ${
        message.sender === "user" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
      }`}
    >
      {message.sender === "bot" ? (
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{message.text}</ReactMarkdown>
      ) : (
        message.text
      )}
    </div>
  </motion.div>
))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-start"
                >
                  <div className="rounded-xl p-3 max-w-[70%] bg-purple-600 text-white">
                    Thinking...
                  </div>
                </motion.div>
              )}
            </div>
            <div className="flex space-x-2 p-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="rounded-xl"
                disabled={loading}
              />
              <Button 
                onClick={handleSend} 
                className="btn-secondary" 
                disabled={loading}
              >
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
