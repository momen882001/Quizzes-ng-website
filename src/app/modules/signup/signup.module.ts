import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './component/signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { NgZorroAntdModule } from 'src/app/core/shared-modules/ng-zorro-antd/ng-zorro-antd.module';



@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    SignupRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class SignupModule { }
