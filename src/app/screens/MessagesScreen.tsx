import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Search, User, Circle } from "lucide-react";

const chats = [
  {
    id: 1,
    name: "Mrs. Santos (Landlord)",
    lastMessage: "The water interruption is scheduled for tomorrow.",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Maria Cruz (Roommate)",
    lastMessage: "Can you buy some groceries on your way home?",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Juan Reyes (Roommate)",
    lastMessage: "Thanks for covering the utilities!",
    time: "2 days ago",
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: "Anna Lopez",
    lastMessage: "How's the dorm? Is it good?",
    time: "1 week ago",
    unread: 0,
    online: false,
  },
];

export function MessagesScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="px-6 py-4 space-y-2">
        {chats.map((chat) => (
          <motion.div
            key={chat.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/app/messages/${chat.id}`)}
            className="bg-white rounded-xl p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="relative">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-7 h-7 text-primary" />
              </div>
              {chat.online && (
                <Circle className="w-4 h-4 fill-secondary text-secondary absolute bottom-0 right-0 border-2 border-white rounded-full" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold truncate">{chat.name}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {chat.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                  <span className="ml-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
