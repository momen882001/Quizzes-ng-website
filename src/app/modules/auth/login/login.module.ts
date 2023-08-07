import { SharedModule } from './../../../core/shared-modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { NgZorroAntdModule } from '../../../core/shared-modules/ng-zorro-antd/ng-zorro-antd.module'




@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        SharedModule
    ]
})
export class LoginModule { }
