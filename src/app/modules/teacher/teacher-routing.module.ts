import { ViewQuestionsComponent } from './components/subjects/levels/level/view-questions/view-questions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { ResultsComponent } from './components/results/results.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LevelsComponent } from './components/subjects/levels/levels.component';
import { LevelComponent } from './components/subjects/levels/level/level.component';
import { QuestionsComponent } from './components/subjects/levels/level/questions/questions.component';
import { CreateExamComponent } from './components/subjects/levels/level/create-exam/create-exam.component';

const teacherRoutes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'subjects/:subjectId', component: LevelsComponent },
      { path: 'subjects/:subjectId/level', component: LevelComponent },
      { path: 'subjects/:subjectId/level/createQues', component: QuestionsComponent },
      { path: 'subjects/:subjectId/level/createExam', component: CreateExamComponent },
      { path: 'subjects/:subjectId/level/viewQues', component: ViewQuestionsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(teacherRoutes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
