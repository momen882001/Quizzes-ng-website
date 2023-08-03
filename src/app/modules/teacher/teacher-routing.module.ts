import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './component/teacher.component';

const teacherRoutes: Routes = [{ path: '', component: TeacherComponent }];

@NgModule({
  imports: [RouterModule.forChild(teacherRoutes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
