import { router } from "expo-router";
import { View, Image } from "react-native";

export default function Page() {
  setTimeout(() => router.push({ pathname: "pages/listQuiz" }), 1000);

  return (
    <View className="h-full w-screen justify-center items-center bg-[#412E8B]">
      <Image
        className="h-52 w-52"
        source={require("./../assets/QUIZZEC.png")}
      />
    </View>
  );
}
