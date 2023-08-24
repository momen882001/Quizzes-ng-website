import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'teacher', redirectTo: '/teacher/subjects', pathMatch: 'full' },
  { path: 'student', redirectTo: '/student/examsHistory', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/login/login.module').then(
        (login) => login.LoginModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./modules/auth/signup/signup.module').then(
        (signup) => signup.SignupModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((admin) => admin.AdminModule),
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('./modules/teacher/teacher.module').then(
        (teacher) => teacher.TeacherModule
      ),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./modules/student/student.module').then(
        (student) => student.StudentModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
