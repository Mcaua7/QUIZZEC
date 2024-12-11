export type param = { index: string; user: string };

export type data = {
  user: string | string[];
  title: string;
  description: string;
  imageUrl: string;
  quizData: questions;
};

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
