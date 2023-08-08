import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { ResultsComponent } from './components/results/results.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TeacherComponent,ResultsComponent, SubjectsComponent, ProfileComponent],
  imports: [CommonModule, TeacherRoutingModule, SharedModule,ReactiveFormsModule],
})
export class TeacherModule {}
