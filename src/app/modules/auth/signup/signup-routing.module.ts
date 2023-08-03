import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './component/signup.component';

const signupRoute: Routes = [{ path: '', component: SignupComponent }];

@NgModule({
  imports: [RouterModule.forChild(signupRoute)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
