import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {SnsNewsManagementComponent} from './sns-news-management.component';
import {SnsNewsDetailsComponent} from './subs/sns-news-details/sns-news-details.component'
import {SnsNewsChangeComponent} from './subs/sns-news-change/sns-news-change.component'
import {SnsNewsListComponent} from './subs/sns-news-list/sns-news-list.component'
import {SnsNewsAddComponent} from './subs/sns-news-add/sns-news-add.component'

export const SnsNewsMangementRouting: Routes =[{
		path: 'sns-news-management',
		component: SnsNewsManagementComponent,
		children:[
			{
				path:'',
				redirectTo: 'sns-news-list', 
				pathMatch: 'full'
			},
			{
				path:'sns-news-details',
				component: SnsNewsDetailsComponent
			},
			{
				path: 'sns-news-details/:id',
				component: SnsNewsDetailsComponent
			},

			{
				path:'sns-news-list',
				component: SnsNewsListComponent
			},
			{
				path:'sns-news-add',
				component: SnsNewsAddComponent
			},	
			{
				path:'sns-news-change/:id',
				component: SnsNewsChangeComponent
			},	
			{
				path:'sns-news-change',
				component: SnsNewsChangeComponent
			},				
			
			]
		}
	]

// @NgModule({
// 	imports: [
// CommonModule,
// FormsModule,
// 	RouterModule.forChild([{
// 		path: 'sns-news-management',
// 		component: SnsNewsManagementComponent,
// 		children:[
// 			{
// 				path:'',
// 				redirectTo: 'sns-news-list', 
// 				pathMatch: 'full'
// 			},
// 			{
// 				path:'sns-news-details',
// 				component: SnsNewsDetailsComponent
// 			},

// 			{
// 				path:'sns-news-list',
// 				component: SnsNewsListComponent
// 			},
// 			{
// 				path:'sns-news-add',
// 				component: SnsNewsAddComponent
// 			},	
// 			{
// 				path:'sns-news-change',
// 				component: SnsNewsChangeComponent
// 			},				
			
// 		]
// 	}
// 	])
// 	],
// 	exports: [
// 		RouterModule
// 	]
// })


// const SnsNewsManagementRoutes: Routes = [
	
// ];
// export class SnsNewsManagementRouting{}