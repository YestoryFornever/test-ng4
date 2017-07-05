import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {ActionManageDetialComponent} from './subs/action-manage-detial/action-manage-detial.component';
import {ActionManageListComponent} from './subs/action-manage-list/action-manage-list.component'
import {ActionManageComponent} from './action-manage.component'
export const ActionManageRouting: Routes =[{
		path: 'action-manage',
		component: ActionManageComponent,
		children:[
			{
				path:'',
				redirectTo: 'action-manage-list',
				pathMatch: 'full'
			},
			{
				path:'action-manage-detial',
				component: ActionManageDetialComponent
			},
			{
				path:'action-manage-detial/:id',
				component: ActionManageDetialComponent
			},
			{
				path:'action-manage-list',
				component: ActionManageListComponent
			},		
			]
		}
	]

