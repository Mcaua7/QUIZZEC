import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import RadioInput from "./RadioInput";
import ImgModal from "./ImgModal";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Range_0_3_arr, questionProp } from "../../Types/CreateQuizPage";

const items: Range_0_3_arr = [0, 1, 2, 3];

export default function Questions({
  index,
  questions,
  setQuestions,
  remove,
}: questionProp) {
  const [, setRadio] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const array = questions;
  const quest = index;

  function handleDelete() {
    remove(index);
  }

  return (
    <Animated.View
      entering={FadeInUp.duration(400)}
      key={index}
      className="bg-[#412E8B] mt-3 h-fit rounded-[5px] mx-auto w-11/12 p-2"
    >
      <View className="h-8 flex flex-row items-center justify-between">
        <View className="h-8 flex flex-row items-center">
          <View className="bg-[#F8E607] w-8 h-8 rounded-full flex justify-center items-center">
            <Text className="text-center font-bold text-2xl text-[#412E8B]">
              {index + 1}
            </Text>
          </View>
          <Text className="text-white font-bold text-xl ml-2">Questão</Text>
        </View>
        {index !== 0 && (
          <TouchableOpacity onPress={handleDelete}>
            <View className="bg-red-500 rounded-[5px] items-center justify-center w-8 h-8">
              <Text className="text-white text-center font-bold text-xl">
                X
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        className="bg-white rounded-[5px] mt-2 p-3 h-12"
        placeholder="Título da Questão"
        onChangeText={(e) => (array[index].title = e)}
        defaultValue={array[quest].title}
      />
      <Pressable
        onPress={() => setShowModal(true)}
        className="bg-gray-500 h-52 rounded-[5px] flex justify-center mt-2 w-full mx-auto items-center"
      >
        {questions[index]?.questImgUrl === "" ? (
          <Text className="text-white">Adicione Uma Imagem a sua Questão</Text>
        ) : (
          <Image
            defaultSource={{ uri: questions[index]?.questImgUrl }}
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

      {items.map((items, index: number) => (
        <RadioInput
          setRadio={setRadio}
          questions={questions}
          key={index}
          quest={quest}
          item={items}
        />
      ))}
    </Animated.View>
  );
}
