import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './component/student.component';

const studentRoutes: Routes = [{ path: '', component: StudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(studentRoutes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
