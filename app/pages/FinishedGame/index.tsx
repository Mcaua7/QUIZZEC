import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";

export default function FinishedGame({
  pontos,
  user,
  length,
}: FinishedGamesProps) {
  return (
    <View className="h-full bg-[#412E8B] w-screen flex justify-between">
      <View>
        <Text className="text-white font-semibold text-5xl text-center my-16">
          CONCLUÍDO
        </Text>
        <View className="w-11/12 bg-[#A498D1] mx-auto rounded-[5px] justify-between items-center">
          <Ionicons name="person-circle" size={140} color="white" />
          <Text className="text-xl text-[#412E8B] mb-4">
            {user == "" ? "Anônimo" : user}
          </Text>
          <View className=" w-full  flex flex-row">
            <View className="bg-[#412E8B] rounded-[5px] m-3 flex-1">
              <View className="flex flex-row justify-center items-center">
                <AntDesign name="checkcircle" size={40} color="#22c55e" />
                <Text className="font-bold text-4xl m-2 text-green-500 text-left">
                  {pontos / 5}
                </Text>
              </View>
            </View>
            <View className="bg-[#412E8B] rounded-[5px] flex-1 m-3">
              <View className="flex flex-row justify-center items-center">
                <AntDesign name="closecircle" size={40} color="#ef4444" />
                <Text className="font-bold text-4xl m-2 text-red-500 text-left">
                  {length - pontos / 5}
                </Text>
              </View>
            </View>
          </View>
          <View className="bg-[#412E8B] w-[93%] rounded-[5px] flex flex-row justify-center items-center my-1 mb-3">
            <FontAwesome5 name="trophy" size={40} color="#F8E607" />
            <Text className="text-[#F8E607] text-left text-4xl p-4 font-bold">
              {pontos * 360}
            </Text>
            <FontAwesome5 name="trophy" size={40} color="#F8E607" />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.push({ pathname: "pages/listQuiz" })}
      >
        <Text className="text-white font-bold text-xl bg-red-500 rounded-[5px] m-4 p-6 text-center">
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}

type FinishedGamesProps = {
  pontos: number;
  user: string;
  length: number;
};
