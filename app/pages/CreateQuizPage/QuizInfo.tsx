import React from "react";
import { View, TextInput } from "react-native";
import { QuizInfoProps } from "../../Types/CreateQuizPage";

export default function QuizInfo({ setTitle, setDescription }: QuizInfoProps) {
  return (
    <View className="bg-[#412E8B] mx-auto mt-12 rounded-[5px] w-11/12 h-fit p-2 ">
      <TextInput
        onChangeText={(e: string) => setTitle(e)}
        className="bg-white rounded-[5px] p-3 h-12 "
        placeholder="Título"
      />
      <TextInput
        onChangeText={(e: string) => setDescription(e)}
        multiline={true}
        numberOfLines={4}
        className="bg-white rounded-[5px] mt-3 h-24 p-3 justify-start items-start"
        placeholder="Descrição"
      />
    </View>
  );
}
