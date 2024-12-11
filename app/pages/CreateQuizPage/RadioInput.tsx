import React from "react";
import { View, TextInput, Pressable } from "react-native";
import { RadioInputProps } from "../../Types/CreateQuizPage";

export default function RadioInput({
  item,
  setRadio,
  questions,
  quest,
}: RadioInputProps) {
  function handleChange(e: string) {
    const array = questions[quest];
    array.answers[item].title = e;
    console.log(questions[quest].answers[item].title);
  }

  function handleSetRadio(item: number) {
    setRadio(item);
    const newarray = questions[quest].answers;
    newarray[4] = { correctIndex: item };
    console.log(newarray);
  }

  return (
    <View className="bg-white w-full flex rounded-[5px] mt-2 flex-row justify-between items-center ">
      <TextInput
        onChangeText={handleChange}
        className="bg-white rounded-[5px] flex-1 p-3 h-12"
        placeholder="Resposta do Item"
        defaultValue={questions[quest].answers[item].title}
      />
      <Pressable
        onPress={() => handleSetRadio(item)}
        className={
          "rounded-[5px] m-3 h-5 w-5" +
          (questions[quest].answers[4].correctIndex === item
            ? " bg-green-500"
            : " bg-gray-500")
        }
      ></Pressable>
    </View>
  );
}
