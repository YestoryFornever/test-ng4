import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
export const CustomerServiceRouting: Routes = [
	{
		path: 'customer-service',
		loadChildren: './customer-service.module#CustomerServiceModule'
	},
];
