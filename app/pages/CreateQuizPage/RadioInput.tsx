import React from "react";
import { View, TextInput, Pressable } from "react-native";

export default function RadioInput({
  item,
  setQuestions,
  setRadio,
  questions,
  quest,
  radio,
}: radioInputProps) {
  function handleChange(e: string) {
    const array = questions[quest];
    array.answers[item].title = e;
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
        className="bg-white rounded-[5px] flex-1 "
        placeholder="Resposta do Item"
      />
      <Pressable
        onPress={() => handleSetRadio(item)}
        className={
          "rounded-[5px] m-3 h-5 w-5" +
          (radio === item ? " bg-green-500" : " bg-gray-500")
        }
      ></Pressable>
    </View>
  );
}

type radioInputProps = {
  radio: number;
  item: number;
  setQuestions: Function;
  setRadio: Function;
  questions: Array<Object>;
  quest: number;
};
