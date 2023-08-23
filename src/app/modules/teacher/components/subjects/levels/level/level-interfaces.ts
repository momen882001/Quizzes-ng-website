export interface viewQuestionInterface {
  title: string;
  questions: string;
  id: string;
  description: string;
  answersList: { id: string; answer: string; isCorrect: boolean }[];
}
