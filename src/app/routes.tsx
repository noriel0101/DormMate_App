import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./screens/SplashScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { MainLayout } from "./layouts/MainLayout";
import { HomeScreen } from "./screens/HomeScreen";
import { DormListingScreen } from "./screens/DormListingScreen";
import { DormDetailScreen } from "./screens/DormDetailScreen";
import { PaymentsScreen } from "./screens/PaymentsScreen";
import { MessagesScreen } from "./screens/MessagesScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { AIChatScreen } from "./screens/AIChatScreen";
import { RoommateMatchingScreen } from "./screens/RoommateMatchingScreen";
import { UserProfileScreen } from "./screens/UserProfileScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/onboarding",
    Component: OnboardingScreen,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      { index: true, Component: HomeScreen },
      { path: "dorms", Component: DormListingScreen },
      { path: "dorms/:id", Component: DormDetailScreen },
      { path: "payments", Component: PaymentsScreen },
      { path: "messages", Component: MessagesScreen },
      { path: "messages/:id", Component: ChatScreen },
      { path: "notifications", Component: NotificationsScreen },
      { path: "ai-assist", Component: AIChatScreen },
      { path: "roommate-matching", Component: RoommateMatchingScreen },
      { path: "user/:id", Component: UserProfileScreen },
      { path: "profile", Component: ProfileScreen },
      { path: "settings", Component: SettingsScreen },
    ],
  },
]);
