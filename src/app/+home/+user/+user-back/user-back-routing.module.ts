import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {UserBackComponent} from './user-back.component';
import {UserBackDetailComponent} from'./subs/user-back-detail/user-back-detail.component'
import {UserBackListComponent} from'./subs/user-back-list/user-back-list.component'

import {InfoGroupEditComponent} from './subs/info-group-edit/info-group-edit.component'
import {InfoGroupListComponent} from './subs/info-group-list/info-group-list.component'
import {SendInfoComponent} from'./subs/send-info/send-info.component'
import {SendInfoDetialComponent} from './subs/send-info-detial/send-info-detial.component'
import {SendInfoListComponent} from './subs/send-info-list/send-info-list.component'
import {TimingInfoListComponent} from './subs/timing-info-list/timing-info-list.component'


export const UserBackRouting: Routes =[{
	path: '',
	component: UserBackComponent,
	children:[
		{
			path:'',
			redirectTo: 'user-back-list', 
			pathMatch: 'full'
		},
		{
			path:'user-back-detail',
			component: UserBackDetailComponent
		},
		{
			path: 'user-back-detail/:backId/:userId',
			component: UserBackDetailComponent
		},
		{
			path:'user-back-list',
			component: UserBackListComponent
		},{
			path:'info-group-edit',
			component:InfoGroupEditComponent
		},{
			path:'info-group-edit/:id',
			component:InfoGroupEditComponent
		},{
			path:'info-group-list',
			component:InfoGroupListComponent
		},{
			path:'send-info',
			component:SendInfoComponent
		},{
			path:'send-info-detial/:id/:state/:from',
			component:SendInfoDetialComponent
		},{
			path:'send-info-list',
			component:SendInfoListComponent
		},{
			path:'timing-info-list',
			component:TimingInfoListComponent
		}	
			
		
		
	]
}]



// export const UserBackRouting: Routes =[{
// 	path: 'sns-share-management',
// 	component: SnsShareManagementComponent,
// 	children:[
// 		{
// 			path:'',
// 			redirectTo: 'sns-share-list', 
// 			pathMatch: 'full'
// 		},
// 		{
// 			path:'sns-share-change',
// 			component: SnsShareDetailsComponent
// 		},
// 		{
// 			path:'sns-share-change/:id',
// 			component: SnsShareDetailsComponent
// 		},
// 		{
// 			path:'sns-share-list',
// 			component: SnsShareListComponent
// 		},
// 		{
// 			path:'sns-share-add',
// 			component: SnsShareAddComponent
// 		}					
		
// 	]
// }]

