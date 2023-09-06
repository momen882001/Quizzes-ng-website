import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { ResultsComponent } from './components/results/results.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LevelsComponent } from './components/subjects/levels/levels.component';
import { QuestionsComponent } from './components/subjects/levels/level/questions/questions.component';
import { CreateExamComponent } from './components/subjects/levels/level/create-exam/create-exam.component';
import { ViewQuestionsComponent } from './components/subjects/levels/level/view-questions/view-questions.component';
import { ViewExamsComponent } from './components/subjects/levels/level/view-exams/view-exams.component';
import { TeacherHistoryComponent } from './components/subjects/levels/level/teacher-history/teacher-history.component';
import { EditQuestionComponent } from './components/subjects/levels/level/edit-question/edit-question.component';

@NgModule({
  declarations: [
    TeacherComponent,
    ResultsComponent,
    SubjectsComponent,
    ProfileComponent,
    LevelsComponent,
    QuestionsComponent,
    CreateExamComponent,
    ViewQuestionsComponent,
    ViewExamsComponent,
    TeacherHistoryComponent,
    EditQuestionComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class TeacherModule {}
