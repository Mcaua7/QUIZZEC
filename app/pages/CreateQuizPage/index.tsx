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
      answers: [
        { title: "" },
        { title: "" },
        { title: "" },
        { title: "" },
        { correctIndex: 0 },
      ],
    },
  ]);
  const [length, setLength] = useState(1);

  function fecthApi(data: object) {
    fetch("https://api.jsonbin.io/v3/b/674f426ae41b4d34e45f34e2", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key":
          "$2a$10$wA7.q16e..6iGdIDmRLQqe1LHs5K4js9QjduxP0i6kKS88xN9WuMW",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data.record))
      .catch((err) => console.log(err));
    // let req = new XMLHttpRequest();

    // req.onreadystatechange = () => {
    //   if (req.readyState == XMLHttpRequest.DONE) {
    //     console.log(req.responseText);
    //   }
    // };

    // req.open(
    //   "PUT",
    //   "https://api.jsonbin.io/v3/b/674f426ae41b4d34e45f34e2",
    //   true
    // );
    // req.setRequestHeader("Content-Type", "application/json");
    // req.setRequestHeader(
    //   "X-Master-Key",
    //   "$2a$10$wA7.q16e..6iGdIDmRLQqe1LHs5K4js9QjduxP0i6kKS88xN9WuMW"
    // );
    // req.send(data);
  }

  function Save() {
    const array = data;
    array[0] = {
      title: title,
      description: description,
      imageUrl: imageUrl,
      quizData: questions,
    };
    setData(array);
    console.log(data[0]);
    fecthApi(data[0]);
  }

  function handleAddQuestion() {
    const array = questions;
    array.push({
      title: "",
      questImgUrl: "",
      answers: [
        { title: "" },
        { title: "" },
        { title: "" },
        { title: "" },
        { correctIndex: 0 },
      ],
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
