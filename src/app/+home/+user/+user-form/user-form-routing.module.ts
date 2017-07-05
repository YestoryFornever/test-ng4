import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserFormEditComponent } from './user-form-edit/user-form-edit.component'
import { UserFormListComponent } from './user-form-list/user-form-list.component'
import { UserFormComponent } from  './user-form.component'
import { UserFormAddUserComponent } from './user-form-addUser/user-form-addUser.component' 
import { UserFormAddFormComponent } from './user-form-addForm/user-form-addForm.component' 
import { UserFormVipComponent } from './user-form-vip/user-form-vip.component'
import { UserFormVipEditComponent } from './user-form-vipEdit/user-form-vipEdit.component'

export const UserFormRouting: Routes =[{
		path: '',
		component: UserFormComponent,
		children:[
			{
				path:'',
				redirectTo: 'user-form-list', 
				pathMatch: 'full'
			},
			{
				path:'user-form-list',
				component: UserFormListComponent
			},
			{
				path: 'user-form-edit',
				component: UserFormEditComponent
			},
			{
				path:'user-form-add',
				component:UserFormAddUserComponent
			},
			{
				path:'user-form-add/:id/:name',
				component:UserFormAddUserComponent
			},
			{
				path:'user-form-vip',
				component:UserFormVipComponent
			},
			{
				path:'user-form-addForm/:id/:name/:statue',
				component:UserFormAddFormComponent
			},
			{
				path: 'user-form-edit/:id/:name',
				component: UserFormEditComponent
			},
			{
				path:'user-form-vipEdit/:id/:name',
				component:UserFormVipEditComponent
			}		
			]
		}
	]