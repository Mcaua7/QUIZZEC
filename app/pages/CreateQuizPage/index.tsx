import { View, Pressable, TextInput, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const items = [0, 1, 2, 3];

export default function CreateQuizPage() {
  const [data, setData] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [questions, setQuestions] = useState([
    {
      title: "",
      answers: [{ title: "" }, { title: "" }, { title: "" }, { title: "" }],
    },
  ]);
  const [length, setLength] = useState(1);

  function Save() {
    const array = data;
    array.push({
      title: title,
      description: description,
      imageUrl: null,
      quizData: questions,
    });
    console.log(array);
  }

  function handleAddQuestion() {
    const array = questions;
    array.push({
      title: "",
      answers: [{ title: "" }, { title: "" }, { title: "" }, { title: "" }],
    });
    setQuestions(array);
    setLength((prevLength) => prevLength + 1);
  }

  return (
    <ScrollView>
      <View className="bg-white h-fit flex flex-col ">
        <ImageEdit />
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
        <Pressable className="border-[#412E8B] border-2 p-5 w-11/12 mx-auto my-3 rounded-[5px]">
          <Text className="text-center text-[#412E8B] font-bold text-xl">
            Cancelar
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function ImageEdit() {
  return (
    <View className="bg-gray-500 h-60">
      <Pressable className="flex justify-center items-center bg-[#004BE0] h-[70px] absolute right-5 -bottom-9 rounded-[5px] shadow-md w-[70px]">
        <MaterialIcons name="mode-edit" size={45} color="white" />
      </Pressable>
    </View>
  );
}

function QuizInfo({ setTitle, setDescription }: QuizInfoProps) {
  return (
    <View className="bg-[#412E8B] mx-auto mt-12 rounded-[5px] w-11/12 h-fit p-2 ">
      <TextInput
        onChangeText={(e: string) => setTitle(e)}
        className="bg-white rounded-[5px] "
        placeholder="Título"
      />
      <TextInput
        onChangeText={(e: string) => setDescription(e)}
        multiline={true}
        numberOfLines={4}
        className="bg-white rounded-[5px] mt-3 h-24 justify-start items-start"
        placeholder="Descrição"
      />
    </View>
  );
}

function Questions({ index, questions, setQuestions }: questionProp) {
  const [radio, setRadio] = useState(0);

  const array = questions;
  const quest = index;

  function handleChangeTitle(e) {
    array[quest].title = e;
    setQuestions(array);
  }

  return (
    <View
      key={index}
      className="bg-[#412E8B] mt-3 h-fit rounded-[5px] mx-auto w-11/12 p-2"
    >
      <View className="h-8 flex flex-row items-center">
        <View className="bg-[#F8E607] w-8 h-8 rounded-full flex justify-center items-center">
          <Text className="text-center font-bold text-2xl text-[#412E8B]">
            {index + 1}
          </Text>
        </View>
        <Text className="text-white font-bold text-xl ml-2">Questão</Text>
      </View>
      <TextInput
        className="bg-white rounded-[5px] mt-2"
        placeholder="Título da Questão"
        onChangeText={(e) => (array[index].title = e)}
      />
      <Pressable className="bg-gray-500 h-52 rounded-[5px] flex justify-center mt-2 w-full mx-auto items-center">
        <Text className="text-gray-300 w-40">
          Clique Aqui Para adicionar uma URL de Uma Imagem
        </Text>
      </Pressable>
      {items.map((items, index) => (
        <RadioInput
          radio={radio}
          setRadio={setRadio}
          setQuestions={setQuestions}
          questions={questions}
          key={index}
          quest={quest}
          item={index}
        />
      ))}
    </View>
  );
}

function RadioInput({
  item,
  setQuestions,
  setRadio,
  questions,
  quest,
  radio,
}: radioInputProps) {
  function handleChange(e) {
    const array = questions[quest];
    array.answers[item].title = e;
    console.log(array.answers);
  }

  function handleSetRadio(item: number) {
    setRadio(item);
    const newarray = questions[quest].answers;
    newarray[4] = { correctIndex: item };
    console.log(newarray);
  }

  return (
    <View className="bg-white w-full flex rounded-[5px] mt-2 flex-row justify-between items-center ">
      <TextInput
        onChangeText={handleChange}
        className="bg-white rounded-[5px] flex-1 "
        placeholder="Resposta do Item"
      />
      <Pressable
        onPress={() => handleSetRadio(item)}
        className={
          "rounded-[5px] m-3 h-5 w-5" +
          (radio === item ? " bg-green-500" : " bg-gray-500")
        }
      ></Pressable>
    </View>
  );
}

type radioInputProps = {
  radio: number;
  item: number;
  setQuestions: Function;
  setRadio: Function;
  questions: Array<Object>;
  quest: number;
};
type questionProp = {
  items: Object;
  setQuestions: Function;
  questions: Array<Object>;
  index: number;
};

type QuizInfoProps = {
  setTitle: Function;
  setDescription: Function;
};
