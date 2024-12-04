import { View, TouchableOpacity, Text, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";
import { router } from "expo-router";

export default function Profile() {
  const [isChanging, setIsChanging] = useState(false);
  const [user, setUser] = useState("");

  function handleChange(e: string) {
    setIsChanging(false);
    setUser(e.nativeEvent.text);
  }

  return (
    <View className="bg-[#412E8B] h-full flex flex-col items-center w-full">
      <View className="h-fit flex-row-reverse w-full">
        <TouchableOpacity className="w-[40px] m-4" onPress={() => (router.back())}>
          <FontAwesome5 name="arrow-right" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <Ionicons name="person-circle" size={180} color="white" />
      <TouchableOpacity onPress={() => setIsChanging(true)}>
        {isChanging == true ? (
          <TextInput
            className="bg-white w-72 p-4 rounded-[5px]"
            onSubmitEditing={handleChange}
          />
        ) : (
          <View className="border-[1px] rounded-[5px] border-white w-8/12 flex">
            <Text className="text-center text-white font-bold text-xl p-3">
              {user == "" ? "Anônimo" : user}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <Text className="text-white mt-4">
        Clique na seção acima para Editar o seu Nome
      </Text>
    </View>
  );
}
