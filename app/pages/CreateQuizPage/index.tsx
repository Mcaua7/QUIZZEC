import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ImageEdit from "./ImageEdit";
import QuizInfo from "./QuizInfo";
import Questions from "./Questions";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";

const EMPTYDATA: data = [
  {
    user: "",
    title: "",
    description: "",
    imageUrl: "",
    quizData: [
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
    ],
  },
];

type data = [
  {
    user: string | string[];
    title: string;
    description: string;
    imageUrl: string;
    quizData: questions;
  },
];
type questions = [
  {
    title: string;
    questImgUrl: string;
    answers: [
      { title: string },
      { title: string },
      { title: string },
      { title: string },
      { correctIndex: number },
    ];
  },
];

export default function CreateQuizPage() {
  const [isDisable, setIsDisable] = useState(false);
  const [data, setData] = useState<data>(EMPTYDATA);
  const params = useLocalSearchParams();
  const user = params.user;
  console.log(user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [questions, setQuestions] = useState<questions>([
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
    let array: object[];

    fetch("https://api.jsonbin.io/v3/b/674f426ae41b4d34e45f34e2", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key":
          "$2a$10$gCSm9EzP4f4OevslF6w/oe6rwH0ninVR0BZrSOHyTxw1OR/6EbVj.",
      },
    })
      .then((resp) => resp.json())
      .then((data) => (array = data.record))
      .then((array) => array.push(data))
      .then(() => {
        fetch("https://api.jsonbin.io/v3/b/674f426ae41b4d34e45f34e2", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key":
              "$2a$10$wA7.q16e..6iGdIDmRLQqe1LHs5K4js9QjduxP0i6kKS88xN9WuMW",
          },
          body: JSON.stringify(array),
        })
          .then((resp) => resp.json())
          .then((data) => console.log(data.record))
          .catch((err) => console.log(err));
      });
  }
  function Save() {
    const array = data;
    array[0] = {
      user: user,
      title: title,
      description: description,
      imageUrl: imageUrl,
      quizData: questions,
    };
    console.log(array);
    let erro = [];
    let erroGeral = false;
    if (array[0].description === "" || array[0].title === "") {
      erroGeral = true;
      Toast.show({
        type: "error",
        text1: "Erro nas Definições do Quiz",
        text2: "O Titulo e/ou Descrição não podem ser vazias",
      });
    }
    for (let i = 0; i < array[0].quizData.length; i++) {
      if (array[0].quizData[i].title === "") {
        erro.push(i + 1);
        erroGeral = true;
        console.log(erro);
      }
      if (
        array[0].quizData[i].answers[0].title === "" ||
        array[0].quizData[i].answers[1].title === "" ||
        array[0].quizData[i].answers[2].title === "" ||
        array[0].quizData[i].answers[3].title === ""
      ) {
        erro.push(i + 1);
        erroGeral = true;
      }
      if (erro.length !== 0) {
        const questions = new Set(erro);
        const newQuestions = Array.from(questions);

        Toast.show({
          type: "error",
          text1: `Erro na Questão ${newQuestions}`,
          text2: `As Respectivas Questões não podem ter titulo ou itens vazios`,
        });
      }
    }
    if (erroGeral === false) {
      setIsDisable(true);
      console.log("funcão executada com sucesso");
      setData(array);
      fecthApi(data[0]);
      Toast.show({
        type: "success",
        text1: `Execução Bem Sucedida`,
        text2: `Quiz Cadastrado Com Sucesso`,
      });
      setTimeout(() => {
        Reset();
      }, 2000);
    }
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
    setLength(() => length + 1);
  }
  function handleRemoveQuestion(index: number) {
    const array = questions;
    console.log(index);
    if (array.length > 1) {
      array.splice(index, 1);
      setQuestions(array);
      setLength((prevLength) => prevLength - 1);
      console.log(questions);
    }
  }

  function Reset() {
    router.back();
  }

  return (
    <View>
      <ScrollView>
        <View className="bg-white h-fit flex flex-col ">
          <ImageEdit imageUrl={imageUrl} setImageUrl={setImageUrl} />
          <QuizInfo setTitle={setTitle} setDescription={setDescription} />
          <View className="flex flex-col">
            {questions.map((items, index) => (
              <Questions
                remove={handleRemoveQuestion}
                setQuestions={setQuestions}
                questions={questions}
                items={items}
                index={index}
                key={index}
              />
            ))}
          </View>
          <TouchableOpacity
            onPress={handleAddQuestion}
            className="bg-[#412E8B] justify-center items-center mt-3 w-11/12 mx-auto rounded-[5px] flex p-2"
          >
            <Text className="text-white font-bold text-5xl h-10 w-6">+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={Save}
            disabled={isDisable}
            className="bg-[#412E8B] p-5 w-11/12 mx-auto mt-14 rounded-[5px]"
          >
            <Text className="text-center text-white font-bold text-xl">
              Salvar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setData(EMPTYDATA);
              Reset();
            }}
            className="border-[#412E8B] border-2 p-5 w-11/12 mx-auto my-3 rounded-[5px]"
          >
            <Text className="text-center text-[#412E8B] font-bold text-xl">
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
}
