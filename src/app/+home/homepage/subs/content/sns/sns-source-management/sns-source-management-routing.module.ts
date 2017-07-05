import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {SnsSourceListComponent} from './subs/sns-source-list/sns-source-list.componment'
import {SnsSourceDetialComponent} from'./subs/sns-source-detial/sns-source-detial.componment'
import {SnsSourceManagementComponent} from'./sns-source-management.componment'
export const SnsSourceManagementRouting: Routes =[{
	path: 'sns-source-management',
	component: SnsSourceManagementComponent,
	children:[
		{
			path:'',
			redirectTo: 'sns-source-list', 
			pathMatch: 'full'
		},
		{
			path:'sns-source-detial',
			component: SnsSourceDetialComponent
		},
		{
			path:'sns-source-detial/:id/:sourceName',
			component: SnsSourceDetialComponent
		},
		{
			path:'sns-source-list',
			component: SnsSourceListComponent
		}				
	]
}]

