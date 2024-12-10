import React from "react";
import {
  View,
  Modal,
  TextInput,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";

let array: object;
export default function ImgModal({
  showModal,
  setShowModal,
  index,
  questions,
  setQuestions,
}: ImgModalprops) {
  function handleModal() {
    setShowModal(false);
    setQuestions(array);
  }

  function handleChange(e: string) {
    array = questions;
    array[index].questImgUrl = e;
  }

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowModal(false)}
    >
      <View className="w-full h-full bg-[#00000050]">
        <View className="bg-[#412E8B] rounded-[5px] mx-auto my-auto p-2 w-11/12">
          <TextInput
            className="full bg-white h-10 rounded-[5px]"
            placeholder="Url Da Imagem"
            onChangeText={handleChange}
          />
          <TouchableOpacity
            onPress={handleModal}
            className="p-3 bg-yellow-500 rounded-[5px] mt-2"
          >
            <Text className="text-white font-bold text-center text-xl">
              Enviar Imagem
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

type ImgModalprops = {
  showModal: boolean;
  setShowModal: Function;
  index: number;
  questions: Array<Object>;
  setQuestions: Function;
};
