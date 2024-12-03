import React from "react";
import { View, TextInput } from "react-native";

export default function QuizInfo({ setTitle, setDescription }: QuizInfoProps) {
  return (
    <View className="bg-[#412E8B] mx-auto mt-12 rounded-[5px] w-11/12 h-fit p-2 ">
      <TextInput
        onChangeText={(e: string) => setTitle(e)}
        className="bg-white rounded-[5px] "
        placeholder="Título"
      />
      <TextInput
        onChangeText={(e: string) => setDescription(e)}
        multiline={true}
        numberOfLines={4}
        className="bg-white rounded-[5px] mt-3 h-24 justify-start items-start"
        placeholder="Descrição"
      />
    </View>
  );
}

type QuizInfoProps = {
  setTitle: Function;
  setDescription: Function;
};
