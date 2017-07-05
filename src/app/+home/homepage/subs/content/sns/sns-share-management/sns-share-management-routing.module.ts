import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {SnsShareManagementComponent} from './sns-share-management.componment'
import {SnsShareDetailsComponent} from'./subs/sns-share-detilas/sns-share-details.component'
import {SnsShareListComponent} from'./subs/sns-share-list/sns-share-list.component'
import {SnsShareAddComponent} from'./subs/sns-share-add/sns-share-add.component'
export const SnsShareManagementRouting: Routes =[{
	path: 'sns-share-management',
	component: SnsShareManagementComponent,
	children:[
		{
			path:'',
			redirectTo: 'sns-share-list', 
			pathMatch: 'full'
		},
		{
			path:'sns-share-change',
			component: SnsShareDetailsComponent
		},
		{
			path:'sns-share-change/:id',
			component: SnsShareDetailsComponent
		},
		{
			path:'sns-share-list',
			component: SnsShareListComponent
		},
		{
			path:'sns-share-add',
			component: SnsShareAddComponent
		}					
		
	]
}]

