import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserCommunicationDetialComponent } from './subs/user-communication-detial/user-communication-detial.component'
import { UserCommunicationListComponent } from './subs/user-communication-list/user-communication-list.component'
import { UserCommunicationRelationComponent } from './subs/user-communication-relation/user-communication-relation.component'
import { UserCommunicationComponent } from './user-communication.component'

export const UserCommunicationRouting: Routes =[{
		path: 'user-communication',
		component: UserCommunicationComponent,
		children:[
			{
				path:'',
				redirectTo: 'user-communication-detial', 
				pathMatch: 'full'
			},
			{
				path:'user-communication-list',
				component: UserCommunicationListComponent
			},
			{
				path: 'user-communication-detial/:id1/:name1/:id2/:name2',
				component: UserCommunicationDetialComponent
			},
			{
				path: 'user-communication-detial',
				component: UserCommunicationDetialComponent
			},
			{
				path: 'user-communication-relation/:id/:name',
				component: UserCommunicationRelationComponent
			},		
			]
		}
	]