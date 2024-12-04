import { View } from "react-native";
import ListQuiz from "./pages/listQuiz";
import Profile from "./pages/Profile";

export default function Page() {
  return (
    <View className="h-full w-screen">
      <ListQuiz />
    </View>
  );
}
