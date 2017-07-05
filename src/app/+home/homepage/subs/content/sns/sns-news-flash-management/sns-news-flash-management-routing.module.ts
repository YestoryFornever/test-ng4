import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {SnsNewsFlashManagementComponent} from './sns-news-flash-management.component';
import {SnsNewsFlashChangeComponent} from './subs/sns-news-flash-change/sns-news-flash-change.componment'
import {SnsNewsFlashListComponent} from './subs/sns-news-flash-list/sns-news-flash-list.component'

export const SnsNewsFlashManagementRouting: Routes =[{
		path: 'sns-news-flash-management',
		component: SnsNewsFlashManagementComponent,
		children:[
			{
				path:'',
				redirectTo: 'sns-news-flash-list', 
				pathMatch: 'full'
			},
			{
				path:'sns-news-flash-change',
				component: SnsNewsFlashChangeComponent
			},
			{
				path:'sns-news-flash-list',
				component: SnsNewsFlashListComponent
			},
			{
				path: 'sns-news-flash-details/:id',
				component: SnsNewsFlashChangeComponent
			},			
			
			]
		}
	]

