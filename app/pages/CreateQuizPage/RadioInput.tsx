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
        className="bg-white rounded-[5px] flex-1 p-3 "
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
type Range_0_3 = 0 | 1 | 2 | 3;

type radioInputProps = {
  radio: number;
  item: Range_0_3;
  setQuestions: Function;
  setRadio: Function;
  questions: [
    {
      title: string;
      questImgUrl: string;
      answers: [
        { title: string },
        { title: string },
        { title: string },
        { title: string },
        { correctIndex: number },
      ];
    },
  ];
  quest: number;
};
