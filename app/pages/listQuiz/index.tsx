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
import Animated, { FadeInUp } from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { QuizData } from "../../Types/listQuiz";

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
            className="w-[86%] bg-white rounded-[5px]"
          />
          <FontAwesome name="search" size={20} color="black" />
        </View>
        <TouchableOpacity
          className="h-[50px] w-[50px]"
          onPress={() => {
            router.push({ pathname: "pages/qrCodeReader" });
          }}
        >
          <MaterialCommunityIcons name="qrcode-scan" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 pt-[1px] flex">
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
                  <Animated.View entering={FadeInUp.duration(300)} key={index}>
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
                        {item.imageUrl && item.imageUrl !== "" ? (
                          <View className="w-full">
                            <Image
                              className="w-full border-[1px] z-50 h-[200px] mb-[10px] bg-[#d8d8d800]"
                              source={{ uri: item.imageUrl }}
                            ></Image>
                            <View className="absolute w-full h-[200px] justify-center items-center bg-[#c3c4c7]">
                              <MaterialIcons
                                name="broken-image"
                                size={70}
                                color="gray"
                              />
                            </View>
                          </View>
                        ) : (
                          <View className="w-full border-[1px] border-[#929292] h-[200px] mb-[10px] justify-center items-center bg-[#323f61]">
                            <Image
                              className="h-28 w-28"
                              source={require("../../../assets/QUIZZEC-whihout-bg.png")}
                            />
                          </View>
                        )}
                        <Text className="text-white text-[30px]">
                          {item.title.length > 25
                            ? item.title.slice(1, 25) + "..."
                            : item.title}
                        </Text>
                        <Text className="text-[#ffffff9a] text-[14px]">
                          {item.description.length > 95
                            ? item.description.slice(1, 95) + "..."
                            : item.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                )
            )}
          </ScrollView>
        )}
        <TouchableOpacity
          className="absolute bottom-[20px] left-[300px] bg-[#9e86ff] h-[60px] w-[60px] justify-center items-center rounded-[5px] shadow-2xl shadow-black z-[5px]"
          onPress={Route}
        >
          <FontAwesome5 name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
