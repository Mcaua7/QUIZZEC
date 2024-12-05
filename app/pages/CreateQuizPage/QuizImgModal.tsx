import React from "react";
import { View, Modal, TextInput, Pressable, Text } from "react-native";

export default function QuizImgModal({
  showModal,
  setShowModal,
  setImageUrl,
}: QuizImgProps) {
  function handleChange(e: any) {
    setShowModal(false);
    setImageUrl(e.nativeEvent.text);
  }

  return (
    <Modal visible={showModal} transparent animationType="fade">
      <View className="w-full h-full bg-[#00000050]">
        <View className="bg-[#310cc7] rounded-[5px] mx-auto my-auto p-2 w-11/12">
          <TextInput
            className="full bg-white rounded-[5px]"
            placeholder="Url Da Imagem"
            onSubmitEditing={handleChange}
          />
        </View>
      </View>
    </Modal>
  );
}

type QuizImgProps = {
  setImageUrl: Function;
  showModal: boolean;
  setShowModal: Function;
};
