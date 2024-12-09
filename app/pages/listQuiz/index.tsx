import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useState, useCallback } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "expo-router";

type QuizData = {
  title: string;
  description: string;
  imageUrl: string;
  quizData: any[];
};

export default function ListQuiz() {
  const [search, setSearch] = useState("");
  const [quiz, setQuiz] = useState<QuizData[]>([]);

  const params = useLocalSearchParams();
  const user = params.user;

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://api.jsonbin.io/v3/b/674f426ae41b4d34e45f34e2",
            {
              method: "GET",
              headers: {
                "X-Access-Key":
                  "$2a$10$gCSm9EzP4f4OevslF6w/oe6rwH0ninVR0BZrSOHyTxw1OR/6EbVj.",
              },
            }
          );
          const data = await response.json();
          //console.log(data);
          setQuiz(data.record);
          console.log("dados recebidos", data.record);
        } catch (error) {
          console.error("erro ao bucar dados", error);
        }
      };
      fetchData();

      return () => {
        console.log("unfocus");
      };
    }, [])
  );

  function Route() {
    router.push({ pathname: "/pages/CreateQuizPage", params: { user } });

    console.log("fui clicado");
  }

  return (
    <View className="flex-1">
      <View className="flex-row bg-[#412E8B] justify-between p-[20px] h-[80px]">
        <TouchableOpacity
          className="h-[50px] w-[50px]"
          onPress={() => {
            router.push({ pathname: "pages/Profile" });
          }}
        >
          <FontAwesome name="user-circle-o" size={40} color="white" />
        </TouchableOpacity>
        <View className="w-3/5 h-10 flex flex-row items-center bg-white rounded-[5px]">
          <TextInput
            onChangeText={(e) => setSearch(e)}
            className="w-[87%] bg-white rounded-[5px]"
          />
          <FontAwesome name="search" size={20} color="black" />
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push({ pathname: "pages/qrCodeReader" });
          }}
        >
          <MaterialCommunityIcons name="qrcode-scan" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 pt-[40px] flex">
        {quiz.length === 0 ? (
          <ActivityIndicator className="my-auto" size="large" color="#412E8B" />
        ) : (
          <ScrollView>
            {quiz.map(
              (item, index) =>
                (item.description
                  .toUpperCase()
                  .includes(search.toUpperCase()) ||
                  item.title.toUpperCase().includes(search.toUpperCase())) && (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        JSON.stringify(item);
                        console.log(item);
                        router.push({
                          pathname: "pages/QuizPage",
                          params: { index, user },
                        });
                      }}
                    >
                      <View className="m-[10px] border-[1px] bg-[#412E8B] items-start p-[10px]">
                        <Image
                          className="w-full border-[1px] h-[200px] mb-[10px] bg-[#d8d8d8]"
                          source={{ uri: item.imageUrl }}
                        ></Image>
                        <Text className="text-white text-[30px]">
                          {item.title}
                        </Text>
                        <Text className="text-[#ffffff9a] text-[14px]">
                          {item.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
            )}
          </ScrollView>
        )}
        <TouchableOpacity
          className="absolute
    bottom-[20px]
    left-[300px]
    bg-[#543db3]
    h-[60px]
    w-[60px]
    justify-center
    items-center
    rounded-[5px]
    shadow-2xl
    shadow-black
    z-[5px]"
          onPress={Route}
        >
          <FontAwesome5 name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
