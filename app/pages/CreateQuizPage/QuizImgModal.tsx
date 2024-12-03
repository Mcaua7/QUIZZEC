import React from "react";
import { View, Modal, TextInput, Pressable, Text } from "react-native";

export default function QuizImgModal({
  showModal,
  setShowModal,
  setImageUrl,
}: QuizImgProps) {
  function handleModal() {
    setShowModal(false);
  }
  function handleChange(e: any) {
    setImageUrl(e);
  }

  return (
    <Modal visible={showModal} transparent animationType="fade">
      <View className="w-full h-full bg-[#00000050]">
        <View className="bg-[#310cc7] rounded-[5px] mx-auto my-auto p-2 w-11/12">
          <TextInput
            className="full bg-white rounded-[5px]"
            placeholder="Url Da Imagem"
            onChangeText={handleChange}
          />
          <Pressable
            onPress={handleModal}
            className="p-3 bg-green-500 rounded-[5px] mt-2"
          >
            <Text className="text-white font-bold text-center text-xl">
              Enviar Imagem
            </Text>
          </Pressable>
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
