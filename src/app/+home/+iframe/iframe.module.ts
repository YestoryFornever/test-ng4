import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './iframe.routes';
import { IframeComponent } from './iframe.component';
@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    IframeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class IframeModule {
  public static routes = routes;
}
