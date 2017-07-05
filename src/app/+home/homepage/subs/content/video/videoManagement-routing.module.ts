import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {VideoManagementComponent} from './videoManagement.component'
import {VideoListComponent} from './video-list/video-list.component'
import { VideoDetialComponent } from './video-detial/video-detial.component';


export const VideoManagementRouting: Routes =[{
	path: 'video-management',
	component: VideoManagementComponent,
	children:[
		{
			path:'',
			redirectTo: 'video-list', 
			pathMatch: 'full'
		},
		{
			path:'video-list',
			component: VideoListComponent
		},
		{
			path:'video-detial/:id',
			component: VideoDetialComponent
		},
		
	]
}]




