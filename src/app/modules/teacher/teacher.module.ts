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
import { LevelComponent } from './components/subjects/levels/level/level.component';
import { CreateExamComponent } from './components/subjects/levels/level/create-exam/create-exam.component';
import { ViewQuestionsComponent } from './components/subjects/levels/level/view-questions/view-questions.component';

@NgModule({
  declarations: [
    TeacherComponent,
    ResultsComponent,
    SubjectsComponent,
    ProfileComponent,
    LevelsComponent,
    QuestionsComponent,
    LevelComponent,
    CreateExamComponent,
    ViewQuestionsComponent,
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
