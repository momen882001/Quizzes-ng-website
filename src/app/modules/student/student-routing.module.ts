import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StartExamComponent } from './components/start-exam/start-exam.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExamsHistoryComponent } from './components/exams-history/exams-history.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { ExamComponent } from './components/exam/exam.component';

const studentRoutes: Routes = [
  {
    path: '',
    component: StudentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'examsHistory', component: ExamsHistoryComponent },
      { path: 'startExam/:examId', component: StartExamComponent },
      { path: 'startExam/:examId/exam', component: ExamComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(studentRoutes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
