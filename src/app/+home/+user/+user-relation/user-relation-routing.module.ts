import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserRelationListComponent } from './user-relation-list/user-relation-list.component'
import { UserRelationDetailComponent } from './user-relation-detial/user-relation-detial.component'
import { UserRelationComponent } from  './user-relation.component'
import { UserRelationPlateComponent } from './user-relation-plate/user-relation-plate.component'
import { UserRelationLogComponent } from './user-relation-log/user-relation-log.component'

export const routes: Routes =[{
		path: '',
		component: UserRelationComponent,
		children:[
			{
				path:'',
				redirectTo: 'user-relation-list', 
				pathMatch: 'full'
			},
			{
				path:'user-relation-list',
				component: UserRelationListComponent
			},
			{
				path: 'user-relation-detial',
				component: UserRelationDetailComponent
			},
			{
				path: 'user-relation-detial/:id/:name',
				component: UserRelationDetailComponent
			},	
			{
				path: 'user-relation-log/:id/:name',
				component: UserRelationLogComponent
			},
			{
				path: 'user-relation-plate/:id/:name',
				component: UserRelationPlateComponent
			}			
			]
		}
	]