import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LiveStreamingComponent } from './live-streaming.component'
import { RdShowLiveStreamingListComponent }  from './subs/rdShow-liveStreaming/rdShow-liveStreaming-list/rdShow-liveStreaming-list.component'
import { RdShowLiveStreamingEditComponent }  from './subs/rdShow-liveStreaming/rdShow-liveStreaming-edit/rdShow-liveStreaming-edit.component'
import { LiveStreamingDetialComponent } from './subs/rdShow-liveStreaming/rdShow-liveStreaming-detial/rdShow-liveStreaming-detial.component'


export const LiveStreamingRouting: Routes =[{
	path: 'live-streaming',
	component: LiveStreamingComponent,
	children:[
		{
			path:'',
			redirectTo: 'rdShow-liveStreaming-list', 
			pathMatch: 'full'
		},
		{
			path:'rdShow-liveStreaming-list',
			component: RdShowLiveStreamingListComponent
		},
		{
			path:'rdShow-liveStreaming-edit/:id/:sta',
			component: RdShowLiveStreamingEditComponent
		},
		{
			path:'rdShow-liveStreaming-edit',
			component: RdShowLiveStreamingEditComponent
		},{
			path:'rdShow-liveStreaming-detial/:id',
			component: LiveStreamingDetialComponent
		}
	]
}]




