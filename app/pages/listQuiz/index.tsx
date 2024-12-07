import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "expo-router";
import styles from "./styles";

type QuizData = {
  title: string;
  description: string;
  imageUrl: string;
  quizData: any[];
};

export default function ListQuiz() {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push({ pathname: "pages/Profile" });
          }}
        >
          <FontAwesome name="user-circle-o" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="qrcode-scan" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {quiz.length === 0 ? (
          <ActivityIndicator className="my-auto" size="large" color="#412E8B" />
        ) : (
          <ScrollView>
            {quiz.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "pages/QuizPage",
                      params: { index, user },
                    })
                  }
                >
                  <View style={styles.quizTemplate}>
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.quizImage}
                    ></Image>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
        <TouchableOpacity style={styles.createButton} onPress={Route}>
          <FontAwesome5 name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
