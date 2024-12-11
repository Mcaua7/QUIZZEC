import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import FinishedGame from "../FinishedGame";
import Animated, { FadeIn } from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ParamQuizGame, Button, ItemsQuestion } from "../../Types/QuizGame";

export default function QuizGame() {
  const params = useLocalSearchParams<ParamQuizGame>();
  const quizInfo = params.string;
  const user = params.user;
  const obj = JSON.parse(quizInfo);
  const [quizGame] = useState(obj.quizData);
  const [question, setQuestion] = useState(1);
  const [clikedButton, setClikedButton] = useState<Button>({
    disable: false,
    index: null,
  });
  const [pontos, setPontos] = useState(0);

  const correct = quizGame[question - 1]?.answers[4].correctIndex;

  function handleSend(index: number) {
    setClikedButton({
      disable: true,
      index: index,
    });
    if (correct === index) {
      setPontos((prev) => prev + 5);
    }
    setTimeout(() => {
      setClikedButton({
        disable: false,
        index: null,
      });
      setQuestion((prev) => prev + 1);
    }, 3000);
    console.log(pontos);
  }

  return (
    <View className="h-full bg-[#412E8B] w-screen justify-center items-center">
      <View className=" w-full ">
        {question <= quizGame.length ? (
          <Animated.View
            entering={FadeIn.duration(500)}
            className="bg-white rounded-[5px] m-1 p-2"
          >
            <View className="flex-row flex items-center mb-1">
              <View className="h-10 w-10 bg-[#F8E607] rounded-full flex justify-center">
                <Text className="text-center text-[#412E8B] font-bold text-xl ">
                  {question}
                </Text>
              </View>
              <Text className="font-semibold text-lg text-[#412E8B] w-12/12 mx-3">
                {quizGame[question - 1].title}
              </Text>
            </View>
            {quizGame[question - 1].questImgUrl !== "" && (
              <View className="flex justify-center items-center">
                <Image
                  className="w-full h-60 my-2 z-50 rounded-[5px] bg-[#c3c4c700]"
                  source={{ uri: quizGame[question - 1].questImgUrl }}
                />
                <View className="absolute bg-[#c3c4c7] flex justify-center items-center w-full h-60 rounded-[5px] my-2 text-white text-2xl text-center">
                  <MaterialIcons name="broken-image" size={80} color="gray" />
                </View>
              </View>
            )}
            {quizGame[question - 1].answers.map(
              (item: ItemsQuestion, index: number) =>
                item.title && (
                  <View key={index}>
                    <TouchableOpacity
                      disabled={clikedButton.disable}
                      onPress={() => handleSend(index)}
                      key={index}
                      className={
                        " rounded-[5px] my-1 p-6 " +
                        (clikedButton.disable === true
                          ? index === correct
                            ? "bg-green-500"
                            : clikedButton.index === index &&
                              clikedButton.index !== correct &&
                              "bg-red-500"
                          : "bg-[#412E8B]")
                      }
                    >
                      <Text className="text-white text-center font-bold text-md">
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
            )}
          </Animated.View>
        ) : (
          <FinishedGame pontos={pontos} length={quizGame.length} user={user} />
        )}
      </View>
    </View>
  );
}
