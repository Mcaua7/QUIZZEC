import { View, Text, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function OnlineRoom() {
  const params = useLocalSearchParams();
  const user = params.user;
  const quizInfo = params.quizInfo;

  function GoBack() {
    router.back();
  }

  return (
    <View className="w-screen h-full bg-[#412E8B]">
      <View className="p-3">
        <TouchableOpacity className="w-[40px]" onPress={GoBack}>
          <FontAwesome5 name="arrow-left" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <View className="w-11/12 h-80 mx-auto my-16">
          <Text className="text-white text-lg m-2">
            clique no QRCODE para visualizar a Sala
          </Text>
          <View className="w-full bg-gray-500 h-full  "></View>
          <Text className="text-white text-lg m-2">
            Mostre esse QRCODE para seus amigos poderem participar do seu Quiz{" "}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
