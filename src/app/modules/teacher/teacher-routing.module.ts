import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { ResultsComponent } from './components/results/results.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ProfileComponent } from './components/profile/profile.component';

const teacherRoutes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'subjects', component: SubjectsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(teacherRoutes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
