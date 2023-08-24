import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentRoutingModule } from './student-routing.module';
import { StartExamComponent } from './components/start-exam/start-exam.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ExamsHistoryComponent } from './components/exams-history/exams-history.component';
import { ExamComponent } from './components/exam/exam.component';



@NgModule({
  declarations: [StudentComponent, StartExamComponent, ProfileComponent, ExamsHistoryComponent, ExamComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
