import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
 
export const ROUTES: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full'},
  { path: 'home', loadChildren: './+home#HomeModule'},
  // { path: 'about', component: AboutComponent },
  { path: 'login', loadChildren: './+login#LoginModule'}, 
  { path: '**',    component: NoContentComponent },
];
