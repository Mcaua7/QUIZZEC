import { View, Text, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect } from "react";

export default function OnlineRoom() {
  const params = useLocalSearchParams();
  const user = params.user;
  const quizInfo = params.quizInfo;

  useEffect(() => {}, []);
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
      <View className="w-11/12 h-80 mx-auto my-16">
        <View className="w-full bg-gray-500 h-full  "></View>
        <Text className="text-white text-lg m-2">
          Compartilhe o QRCODE para seus amigos para que eles possam acessar o
          Quiz também
        </Text>
      </View>
    </View>
  );
}
