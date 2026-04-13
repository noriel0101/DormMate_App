import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, User, Send, Paperclip, Circle } from "lucide-react";
import { sampleUsers } from "../data/users";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
}

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setMessages([]);
    setNewMessage("");
  }, [id]);

  const getChatName = () => {
    const matchedUser = sampleUsers.find((user) => user.id === id);
    return matchedUser ? `${matchedUser.name} (Roommate)` : "Chat";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const nextMessage: Message = {
        id: messages.length + 1,
        text: newMessage.trim(),
        sender: "me",
        time: formatTime(new Date()),
      };

      setMessages((prev) => [...prev, nextMessage]);
      setNewMessage("");
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-4 border-b border-border">
        <button onClick={() => navigate("/app/messages")}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="relative">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <Circle className="w-3 h-3 fill-secondary text-secondary absolute bottom-0 right-0 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1">
          <p className="font-semibold">{getChatName()}</p>
          <p className="text-xs text-secondary">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.sender === "me"
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-white text-foreground rounded-bl-sm"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === "me" ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-75" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-150" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="bg-white border-t border-border p-4 flex items-center gap-3"
      >
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center text-muted-foreground"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-background border border-border rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="w-10 h-10 bg-primary rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </form>
    </div>
  );
}
