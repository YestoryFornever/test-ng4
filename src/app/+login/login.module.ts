import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NetUserService } from 'app/common/net-services';
import { LoginComponent } from './login.component';
@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent}
    ]),
  ],
  providers: [
    
  ]//注册服务器
})
export class LoginModule {
  // public static routes = routes;
}
