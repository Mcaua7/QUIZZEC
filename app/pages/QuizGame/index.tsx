import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function QuizGame() {
  const params = useLocalSearchParams();
  const quizInfo = params.quizInfo;
  const obj = JSON.parse(quizInfo);
  const [quizGame, setQuizGame] = useState(obj.quizData);
  const [question, setQuestion] = useState(1);
  const [clikedButton, setClikedButton] = useState({
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
    if (correct == index) {
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
    <View className="h-full w-screen justify-center items-center">
      <View className=" w-full  p-2">
        {question <= quizGame.length ? (
          <View>
            <View className="flex-row flex items-center">
              <View className="h-10 w-10 bg-[#F8E607] rounded-full flex justify-center">
                <Text className="text-center font-bold text-xl ">
                  {question}
                </Text>
              </View>
              <Text className="font-semibold text-lg w-12/12 mx-3">
                {quizGame[question - 1].title}
              </Text>
            </View>
            {quizGame[question - 1].questImgUrl !== "" && (
              <Image
                className="w-full h-60 my-2 rounded-[5px] bg-blue-500"
                source={{ uri: quizGame[question - 1].questImgUrl }}
              />
            )}
            {quizGame[question - 1].answers.map(
              (item: object, index: number) =>
                item.title && (
                  <TouchableOpacity
                    disabled={clikedButton.disable}
                    onPress={() => handleSend(index)}
                    key={index}
                    className={
                      " rounded-[5px] my-1 p-6 " +
                      (clikedButton.disable == true
                        ? index == correct
                          ? "bg-green-500"
                          : clikedButton.index == index &&
                            clikedButton.index !== correct &&
                            "bg-red-500"
                        : "bg-[#412E8B]")
                    }
                  >
                    <Text className="text-white text-center font-bold text-md">
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )
            )}
          </View>
        ) : (
          <Text>{pontos}</Text>
        )}
      </View>
    </View>
  );
}
