import { ViewQuestionsComponent } from './components/subjects/levels/level/view-questions/view-questions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { ResultsComponent } from './components/results/results.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LevelsComponent } from './components/subjects/levels/levels.component';
import { QuestionsComponent } from './components/subjects/levels/level/questions/questions.component';
import { CreateExamComponent } from './components/subjects/levels/level/create-exam/create-exam.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { ViewExamsComponent } from './components/subjects/levels/level/view-exams/view-exams.component';
import { TeacherHistoryComponent } from './components/subjects/levels/level/teacher-history/teacher-history.component';
import { EditQuestionComponent } from './components/subjects/levels/level/view-questions/edit-question/edit-question.component';
import { AddAnswerComponent } from './components/subjects/levels/level/view-questions/add-answer/add-answer.component';

const teacherRoutes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'subjects/:subjectId', component: LevelsComponent },
      {
        path: 'subjects/:subjectId/:levelId/createExam',
        component: CreateExamComponent,
      },
      {
        path: 'subjects/:subjectId/:levelId/viewQues',
        component: ViewQuestionsComponent,
      },
      {
        path: 'subjects/:subjectId/:levelId/viewQues/editQues/:quesId',
        component: EditQuestionComponent,
      },
      {
        path: 'subjects/:subjectId/:levelId/viewQues/addAnswer/:quesId',
        component: AddAnswerComponent,
      },
      {
        path: 'subjects/:subjectId/:levelId/viewQues/editAnswer/:quesId/:answerId',
        component: AddAnswerComponent,
      },
      {
        path: 'subjects/:subjectId/:levelId/createQues',
        component: QuestionsComponent,
      },
      {
        path: 'subjects/:subjectId/:levelId/viewExams',
        component: ViewExamsComponent,
      },
      {
        path: 'subjects/:subjectId/:levelId/viewExams/editExam/:examId',
        component: CreateExamComponent,
      },
      {
        path: 'subjects/:subjectId/:levelId/viewExams/examsHistory/:examId',
        component: TeacherHistoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(teacherRoutes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
