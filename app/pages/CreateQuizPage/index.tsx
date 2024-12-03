import { View, Pressable, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import ImageEdit from "./ImageEdit";
import QuizInfo from "./QuizInfo";
import Questions from "./Questions";

const items = [0, 1, 2, 3];

export default function CreateQuizPage() {
  const [data, setData] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [questions, setQuestions] = useState([
    {
      title: "",
      questImgUrl: "",
      answers: [{ title: "" }, { title: "" }, { title: "" }, { title: "" }],
    },
  ]);
  const [length, setLength] = useState(1);

  function Save() {
    const array = data;
    array[0] = {
      title: title,
      description: description,
      imageUrl: imageUrl,
      quizData: questions,
    };
    setData(array);
    console.log(data[0].quizData);
  }

  function handleAddQuestion() {
    const array = questions;
    array.push({
      title: "",
      questImgUrl: "",
      answers: [{ title: "" }, { title: "" }, { title: "" }, { title: "" }],
    });
    setQuestions(array);
    setLength((prevLength) => prevLength + 1);
  }

  return (
    <ScrollView>
      <View className="bg-white h-fit flex flex-col ">
        <ImageEdit imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <QuizInfo setTitle={setTitle} setDescription={setDescription} />
        <View className="flex flex-col">
          {questions.map((items, index) => (
            <Questions
              setQuestions={setQuestions}
              questions={questions}
              items={items}
              index={index}
              key={index}
            />
          ))}
        </View>
        <Pressable
          onPress={handleAddQuestion}
          className="bg-[#412E8B] justify-center items-center mt-3 w-11/12 mx-auto rounded-[5px] flex p-2"
        >
          <Text className="text-white font-bold text-5xl h-10 w-6">+</Text>
        </Pressable>
        <Pressable
          onPress={Save}
          className="bg-[#412E8B] p-5 w-11/12 mx-auto mt-14 rounded-[5px]"
        >
          <Text className="text-center text-white font-bold text-xl">
            Salvar
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setData([])}
          className="border-[#412E8B] border-2 p-5 w-11/12 mx-auto my-3 rounded-[5px]"
        >
          <Text className="text-center text-[#412E8B] font-bold text-xl">
            Cancelar
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
