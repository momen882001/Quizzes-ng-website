export interface viewQuestionInterface {
  title: string;
  questions: string;
  id: string;
  description: string;
  answersList: { id: string; answer: string; isCorrect: boolean }[];
}

export interface viewExamsInterface {
  duration: string;
  id: string;
  questionCount: number;
  title: string;
  url: string;
}
