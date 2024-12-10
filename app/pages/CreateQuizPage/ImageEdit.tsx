import React, { useState } from "react";
import { View, Image, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import QuizImgModal from "./QuizImgModal";

export default function ImageEdit({ setImageUrl, imageUrl }: ImageEditProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View className="bg-gray-500 h-60">
      {imageUrl && (
        <Image
          className="h-full"
          source={{
            uri: imageUrl,
          }}
        />
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

type ImageEditProps = {
  setImageUrl: Function;
  imageUrl: string;
};
