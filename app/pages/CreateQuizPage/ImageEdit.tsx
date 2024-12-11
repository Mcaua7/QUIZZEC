import React, { useState } from "react";
import { View, Image, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import QuizImgModal from "./QuizImgModal";
import { ImageEditProps } from "../../Types/CreateQuizPage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ImageEdit({ setImageUrl, imageUrl }: ImageEditProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View className="h-60">
      {imageUrl ? (
        <View>
          <Image
            className="h-full z-20"
            source={{
              uri: imageUrl,
            }}
          />
          <View className="absolute w-full h-full justify-center items-center bg-[#c3c4c7]">
            <MaterialIcons name="broken-image" size={70} color="gray" />
          </View>
        </View>
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
        className="flex justify-center items-center z-50 bg-[#004BE0] h-[70px] absolute right-5 -bottom-9 rounded-[5px] shadow-md w-[70px]"
      >
        <MaterialCommunityIcons name="image-edit" size={45} color="white" />
      </Pressable>
      <QuizImgModal
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </View>
  );
}
