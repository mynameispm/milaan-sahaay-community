
import { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatbotContextType {
  messages: Record<string, Message[]>; // Map of problem ID to message array
  sendMessage: (problemId: string, content: string) => Promise<void>;
  clearChatHistory: (problemId: string) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  const sendMessage = async (problemId: string, content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `msg_${Math.random().toString(36).substring(2, 11)}`,
      role: "user",
      content,
      timestamp: new Date(),
    };

    // Update state with user message
    setMessages((prev) => ({
      ...prev,
      [problemId]: [...(prev[problemId] || []), userMessage],
    }));

    try {
      // In a real app, we would make an API call here
      const apiKey = "AIzaSyAThZia6qgQyRQLNnhrEzXrxOaHkPUBNbY"; // In production this would be in a server environment

      // Simulate API response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate mock response based on the message content
      let responseText = "";
      if (content.toLowerCase().includes("help")) {
        responseText = "I can help you find NGO assistance. What specific help do you need?";
      } else if (content.toLowerCase().includes("contact")) {
        responseText = "You can contact local NGOs through our platform. Would you like me to suggest some based on your problem?";
      } else if (content.toLowerCase().includes("thank")) {
        responseText = "You're welcome! I'm here to help connect you with the right resources.";
      } else {
        responseText = "Thank you for sharing. I recommend describing your problem in detail so NGO helpers can understand how to assist you better. Do you need advice on any specific aspect?";
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: `msg_${Math.random().toString(36).substring(2, 11)}`,
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };

      // Update state with assistant response
      setMessages((prev) => ({
        ...prev,
        [problemId]: [...(prev[problemId] || []), assistantMessage],
      }));
    } catch (error) {
      console.error("Error sending message to AI:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: `msg_${Math.random().toString(36).substring(2, 11)}`,
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      };

      setMessages((prev) => ({
        ...prev,
        [problemId]: [...(prev[problemId] || []), errorMessage],
      }));
    }
  };

  const clearChatHistory = (problemId: string) => {
    setMessages((prev) => ({
      ...prev,
      [problemId]: [],
    }));
  };

  return (
    <ChatbotContext.Provider value={{ messages, sendMessage, clearChatHistory }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};
