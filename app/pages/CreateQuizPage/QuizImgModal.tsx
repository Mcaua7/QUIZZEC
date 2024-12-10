import React from "react";
import { View, Modal, TextInput, TouchableOpacity, Text } from "react-native";

let ImgUrl: string;

export default function QuizImgModal({
  showModal,
  setShowModal,
  setImageUrl,
}: QuizImgProps) {
  function handleChange(e: any) {
    ImgUrl = e;
  }

  function handleModal() {
    setImageUrl(ImgUrl);
    setShowModal(false);
  }

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowModal(false)}
    >
      <View className="w-full h-full bg-[#00000050]">
        <View className="bg-[#310cc7] rounded-[5px] mx-auto my-auto p-2 w-11/12">
          <TextInput
            autoFocus={true}
            className="full bg-white h-10 rounded-[5px]"
            placeholder="Url Da Imagem"
            onChangeText={handleChange}
          />
          <TouchableOpacity
            onPress={handleModal}
            className="bg-yellow-500 p-3 rounded-[5px] mt-2"
          >
            <Text className="text-center text-white font-bold text-xl">
              Enviar Imagem
            </Text>
          </TouchableOpacity>
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
