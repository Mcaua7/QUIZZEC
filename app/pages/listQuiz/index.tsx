import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "./styles";

type QuizData = {
  title: string;
  description: string;
  imageUrl: string;
  quizData: any[];
};

export default function ListQuiz() {
  const [quiz, setQuiz] = useState<QuizData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/674f426ae41b4d34e45f34e2',{
          method: "GET",
          headers: {
            "X-Access-Key": "$2a$10$gCSm9EzP4f4OevslF6w/oe6rwH0ninVR0BZrSOHyTxw1OR/6EbVj."
          }
        });
        const data = await response.json();
        console.log(data);
        setQuiz(data.record);
        console.log("dados recebidos",data.record)
      } catch (error) {
        console.error("erro ao bucar dados", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(quiz);
          }}
        >
          <FontAwesome name="user-circle-o" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="qrcode-scan" size={40} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <FlatList
          data={quiz}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.quizTemplate}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.quizImage}
              ></Image>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity>
          <View style={styles.createButton}>
            <FontAwesome name="plus-square" size={60} color="#412E8B" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
