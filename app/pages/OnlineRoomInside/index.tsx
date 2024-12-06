import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function OnlineRoomInside() {
  const players = [
    { user: "Buther", points: 22000 },
    { user: "Mike", points: 1523 },
    { user: "Felix", points: 7482 },
    { user: "Marco", points: 8050 },
  ];

  function Goback() {
    router.back();
  }
  function Disconnect() {
    router.push({ pathname: "pages/listQuiz" });
  }

  return (
    <View className="w-screen h-full bg-[#412E8B] flex flex-col justify-between">
      <View>
        <View className="p-3">
          <TouchableOpacity className="w-[40px]" onPress={Goback}>
            <FontAwesome5 name="arrow-left" size={40} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView className="h-4/6 w-11/12 mx-auto">
          {players.length !== 0 ? (
            players.map((item, index) => (
              <View
                key={index}
                className="p-2 bg-[#A498D1] rounded-[5px] my-2 flex flex-row items-center justify-between"
              >
                <View className="flex flex-row items-center">
                  <Ionicons name="person-circle" size={60} color="white" />
                  <Text className="text-[#412E8B] ml-2 font-bold text-xl italic">
                    {item.user}
                  </Text>
                </View>
                <View className="bg-[#412E8B] w-24 py-1 rounded-[5px]">
                  <Text className="text-center text-[#F8E607] font-bold text-md italic">
                    {item.points}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text className="text-center text-white mt-40">
              Nenhum Jogador Entrou ainda....
            </Text>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={Disconnect}>
        <Text className="text-white font-bold text-xl text-center bg-red-500 p-6 m-4 rounded-[5px]">
          Desconectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
