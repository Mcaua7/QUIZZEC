import React, { useState } from "react";
import { View, Image, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import QuizImgModal from "./QuizImgModal";
import { ImageEditProps } from "../../Types/CreateQuizPage";

export default function ImageEdit({ setImageUrl, imageUrl }: ImageEditProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View className="bg-gray-500 h-60">
      {imageUrl ? (
        <Image
          className="h-full"
          source={{
            uri: imageUrl,
          }}
        />
      ) : (
        <View className="w-full h-full border-[#929292] mb-[10px] justify-center items-center bg-[#323f61]">
          <Image
            className="h-28 w-28"
            source={require("../../../assets/QUIZZEC-whihout-bg.png")}
          />
        </View>
      )}
      <Pressable
        onPress={() => setShowModal(true)}
        className="flex justify-center items-center bg-[#004BE0] h-[70px] absolute right-5 -bottom-9 rounded-[5px] shadow-md w-[70px]"
      >
        <MaterialCommunityIcons name="image-edit" size={45} color="white" />
      </Pressable>
      <QuizImgModal
        setImageUrl={setImageUrl}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </View>
  );
}
