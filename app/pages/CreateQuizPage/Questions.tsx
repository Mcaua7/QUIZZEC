import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import RadioInput from "./RadioInput";
import ImgModal from "./ImgModal";

const items = [0, 1, 2, 3];

export default function Questions({
  index,
  questions,
  setQuestions,
}: questionProp) {
  const [radio, setRadio] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const array = questions;
  const quest = index;

  return (
    <View
      key={index}
      className="bg-[#412E8B] mt-3 h-fit rounded-[5px] mx-auto w-11/12 p-2"
    >
      <View className="h-8 flex flex-row items-center">
        <View className="bg-[#F8E607] w-8 h-8 rounded-full flex justify-center items-center">
          <Text className="text-center font-bold text-2xl text-[#412E8B]">
            {index + 1}
          </Text>
        </View>
        <Text className="text-white font-bold text-xl ml-2">Questão</Text>
      </View>
      <TextInput
        className="bg-white rounded-[5px] mt-2"
        placeholder="Título da Questão"
        onChangeText={(e) => (array[index].title = e)}
      />
      <Pressable
        onPress={() => setShowModal(true)}
        className="bg-gray-500 h-52 rounded-[5px] flex justify-center mt-2 w-full mx-auto items-center"
      >
        {questions[index]?.questImgUrl == "" ? (
          <Text className="text-white">Adicione Uma Imagem a sua Questão</Text>
        ) : (
          <Image
            className="h-full w-full rounded-[5px]"
            source={{ uri: questions[index]?.questImgUrl }}
          />
        )}
      </Pressable>
      <ImgModal
        questions={questions}
        setQuestions={setQuestions}
        index={index}
        setShowModal={setShowModal}
        showModal={showModal}
      />

      {items.map((items, index) => (
        <RadioInput
          radio={radio}
          setRadio={setRadio}
          setQuestions={setQuestions}
          questions={questions}
          key={index}
          quest={quest}
          item={index}
        />
      ))}
    </View>
  );
}

type questionProp = {
  items: Object;
  setQuestions: Function;
  questions: Array<Object>;
  index: number;
};
