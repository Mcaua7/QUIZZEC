import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

export default function QuizPage() {
  const [quizInfo, setQuizInfo] = useState([]);
  const params = useLocalSearchParams();
  const index = params.index;
  const user = params.user;

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/674f426ae41b4d34e45f34e2", {
      method: "GET",
      headers: {
        "X-Access-Key":
          "$2a$10$gCSm9EzP4f4OevslF6w/oe6rwH0ninVR0BZrSOHyTxw1OR/6EbVj.",
      },
    })
      .then((resp) => resp.json())
      .then((val) => setQuizInfo(val.record[index]));
  }, []);
  function GoBack() {
    router.back();
  }
  function startGame() {
    const string = JSON.stringify(quizInfo);
    router.push({
      pathname: "pages/QuizGame",
      params: { string, user },
    });
  }
  return (
    <View className="h-full w-screen flex justify-center items">
      {quizInfo.length == 0 ? (
        <ActivityIndicator size="large" color="#412E8B" />
      ) : (
        <View className="h-full w-screen flex flex-col justify-between">
          <View>
            <View className="bg-white h-fit p-3">
              <TouchableOpacity className="w-[40px]" onPress={GoBack}>
                <FontAwesome5 name="arrow-left" size={40} color="#412E8B" />
              </TouchableOpacity>
            </View>
            <View>
              <Image
                className="w-screen bg-gray-500 h-60"
                source={{ uri: quizInfo?.imageUrl }}
              />
              <Text className="text-4xl mx-4 my-2 text-[#412E8B] font-bold">
                {quizInfo?.title}
              </Text>
              <Text className="text-xl mx-4  text-[#412E8B]">
                {quizInfo?.description}
                {console.log(quizInfo?.user)}
              </Text>
            </View>
          </View>
          <View>
            <Text className="mx-5 mt-8 text-[#412E8B]">Criado por:</Text>
            <View className="flex flex-row justify-between items-center mx-4">
              <View className="flex flex-row items-center">
                <Ionicons name="person-circle" size={40} color="#412E8B" />
                <Text className="text-lg mx-4 font-semibold  text-[#412E8B]">
                  {quizInfo?.user == undefined ? "Anônimo" : quizInfo?.user}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "pages/QrCodeGenerator",
                    params: { quizInfo, user, index },
                  })
                }
              >
                <Entypo name="share" size={35} color="#412E8B" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="m-4" onPress={startGame}>
              <View className="bg-[#412E8B] p-6 rounded-[5px]">
                <Text className="text-white text-center font-bold text-xl">
                  Jogar
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
