export type ImageEditProps = {
  setImageUrl: Function;
  imageUrl: string;
};

export type ImgModalprops = {
  showModal: boolean;
  setShowModal: Function;
  index: number;
  questions: questions;
  setQuestions: Function;
};

export type questions = [
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

export type data = [
  {
    user: string | string[];
    title: string;
    description: string;
    imageUrl: string;
    quizData: questions;
  },
];

export type Range_0_3 = 0 | 1 | 2 | 3;

export type Range_0_3_arr = Range_0_3[];

export type questionProp = {
  remove: Function;
  items: object;
  setQuestions: Function;
  questions: questions;
  index: number;
};

export type QuizImgProps = {
  setImageUrl: Function;
  showModal: boolean;
  setShowModal: Function;
};

export type QuizInfoProps = {
  setTitle: Function;
  setDescription: Function;
};

export type RadioInputProps = {
  item: Range_0_3;
  setRadio: Function;
  questions: questions;
  quest: number;
};
