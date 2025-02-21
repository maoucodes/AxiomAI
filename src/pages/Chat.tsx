
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    // Simulated response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: "This is a simulated response. To integrate real AI responses, we'll need to connect to an AI service.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-chat-light">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-bubble ${message.role}`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="message-bubble assistant">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-t bg-background">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
          <div className="flex gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
