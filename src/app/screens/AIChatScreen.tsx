import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Paperclip, Mic, Circle, Sparkles } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
  time: string;
  quickReplies?: string[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! I'm DormMate Assist 👋 Your AI Dorm Helper. How can I help you today?",
    sender: "ai",
    time: "Just now",
    quickReplies: [
      "Find a dorm near me",
      "How do I pay rent?",
      "Report a problem",
      "Check my rent due",
    ],
  },
];

const aiResponses: { [key: string]: string } = {
  "find a dorm near me":
    "I can help you find dorms! Based on your profile, you're studying at UP Diliman. I found 12 dorms within 1km radius, starting from ₱3,500/month. Would you like to see the listings?",
  "find cheap dorms":
    "Here are affordable options near you:\n\n🏠 Sunflower Residence - ₱3,500/mo\n🏠 Blue Haven - ₱4,200/mo\n🏠 Green Valley - ₱4,800/mo\n\nAll include WiFi and security. Shall I show you more details?",
  "how do i pay rent?":
    "You can pay your rent through:\n\n💳 GCash - Instant payment\n🏦 Bank Transfer - 1-2 business days\n💰 Credit/Debit Card - Instant\n\nYour current rent is ₱6,500/month, due on April 30. Would you like to pay now?",
  "report a problem":
    "I'm sorry to hear you're experiencing an issue. What kind of problem would you like to report?\n\n🚰 Plumbing\n⚡ Electrical\n🌡️ Air Conditioning\n🔒 Security\n📶 Internet\n\nPlease select or describe your concern.",
  "check my rent due":
    "Here's your rent status:\n\n💵 Amount Due: ₱6,500\n📅 Due Date: April 30, 2026\n⏰ Days Left: 17 days\n\n✅ You're on track! No late fees yet.",
  "my payment status":
    "Your payment summary:\n\n✅ Last Payment: ₱7,300 (Mar 15, 2026)\n⏳ Current Due: ₱6,500\n📅 Due Date: April 30, 2026\n\nNo outstanding balance. Great job staying on top of payments!",
  "dorm amenities":
    "Your current dorm (Sunflower Residence) includes:\n\n📶 WiFi - High-speed unlimited\n📹 CCTV - 24/7 security monitoring\n🍳 Kitchen - Shared, fully equipped\n🧺 Laundry - Washing machine available\n❄️ Aircon - In-room\n💡 Electricity - Metered separately\n\nMonthly rent: ₱6,500",
  "show dorm listings":
    "Opening dorm listings for you! You'll see 12 available dorms near UP Diliman with prices ranging from ₱3,500 to ₱8,500 per month.",
  "filter by price":
    "What's your budget range?\n\n💰 Budget (₱2,000 - ₱4,000)\n💵 Mid-range (₱4,000 - ₱6,000)\n💎 Premium (₱6,000+)",
  "near my school":
    "Searching for dorms within 1km of UP Diliman...\n\nFound 8 options:\n• ₱3,500 - 500m away\n• ₱4,200 - 800m away\n• ₱5,500 - 300m away\n\nWould you like to see them?",
  default:
    "I understand you need help with that. Let me connect you with more specific information. You can also try:\n\n• Browse Dorms\n• Check Payment Status\n• Contact Landlord\n• View Announcements",
};

export function AIChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const messageKey = userMessage.toLowerCase();
      const response =
        aiResponses[messageKey] || aiResponses.default;

      const aiMessage: Message = {
        id: Date.now(),
        text: response,
        sender: "ai",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        quickReplies:
          messageKey === "find a dorm near me"
            ? ["Show dorm listings", "Filter by price", "Near my school"]
            : messageKey === "how do i pay rent?"
            ? ["Pay now", "Payment history", "Set up auto-pay"]
            : messageKey === "report a problem"
            ? ["Plumbing", "Electrical", "Internet"]
            : undefined,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text,
      sender: "user",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    simulateAIResponse(text);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-lg">DormMate Assist 🤖</h1>
            <div className="flex items-center gap-2 text-sm text-white/90">
              <Circle className="w-2 h-2 fill-secondary text-secondary" />
              <span>Online - Ready to help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-[80%]">
                {message.sender === "ai" && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      DormMate Assist
                    </span>
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-white text-foreground rounded-bl-sm shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "user"
                        ? "text-white/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>

                {/* Quick Replies */}
                {message.quickReplies && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2 mt-3"
                  >
                    {message.quickReplies.map((reply, index) => (
                      <motion.button
                        key={index}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickReply(reply)}
                        className="bg-white border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/10 transition-colors shadow-sm"
                      >
                        {reply}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-[80%]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">
                  DormMate is typing...
                </span>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    className="w-2 h-2 bg-primary/60 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 bg-primary/60 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-2 h-2 bg-primary/60 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto bg-white border-t border-border p-4">
        <div className="flex items-end gap-2">
          <button className="w-10 h-10 flex items-center justify-center text-primary mb-1">
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 bg-background border border-border rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary/20">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(inputText);
                }
              }}
              placeholder="Ask something about dorms..."
              className="w-full bg-transparent focus:outline-none text-sm"
            />
          </div>

          <button className="w-10 h-10 flex items-center justify-center text-primary mb-1">
            <Mic className="w-5 h-5" />
          </button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mb-1"
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Suggested Actions */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3"
          >
            <p className="text-xs text-muted-foreground mb-2">
              Try asking:
            </p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {[
                "Find cheap dorms",
                "My payment status",
                "Dorm amenities",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSendMessage(suggestion)}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Human Support */}
        <div className="mt-3 pt-3 border-t border-border">
          <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Need more help? Contact human support →
          </button>
        </div>
      </div>
    </div>
  );
}
