import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {ContactManageComponent} from './contact-manage.component';
import {ContactManageListComponent} from './subs/contact-manage-list.component/contact-manage-list.component'
import {ContactManageChangeComponent} from './subs/contact-manage-change.component/contact-manage-change.component'

export const ContactManageRouting: Routes =[{
		path: 'contact-manage',
		component: ContactManageComponent,
		children:[
			{
				path:'',
				redirectTo: 'contact-manage-list',
				pathMatch: 'full'
			},
			{
				path: 'contact-manage-list',
				component: ContactManageListComponent
			},
			{
				path:'contact-manage-change',
				component: ContactManageChangeComponent
			},	
			{
				path:'contact-manage-change/:id',
				component: ContactManageChangeComponent
			},			
			]
		}
	]
