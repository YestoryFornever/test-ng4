import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChatQueryComponent } from './chat-query.component';

export const ChatQueryRouting: Routes = [
	{
		path: 'chat-query',
		component: ChatQueryComponent
	},
];
