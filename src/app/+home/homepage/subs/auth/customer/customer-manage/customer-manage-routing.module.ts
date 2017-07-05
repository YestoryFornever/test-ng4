import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {CustomerManageAllocationComponent} from './subs/customer-manage-allocation/customer-manage-allocation.component';
import {CustomerManageListComponent} from './subs/customer-manage-list/customer-manage-list.component'
import {CustomerManageSerchComponent} from './subs/customer-manage-serch/customer-manage-serch.component'
import {CustomerManageComponent} from './customer-manage.component'

export const CustomerManageRouting: Routes =[{
		path: 'customer-manage',
		component: CustomerManageComponent,
		children:[
			{
				path:'',
				redirectTo: 'customer-manage-list',
				pathMatch: 'full'
			},
			{
				path: 'customer-manage-list',
				component: CustomerManageListComponent
			},
			{
				path:'customer-manage-allocation',
				component: CustomerManageAllocationComponent
			},	
			{
				path:'customer-manage-allocation/:id/:uName/:lName',
				component: CustomerManageAllocationComponent
			},	
			{
				path:'customer-manage-serch/:id/:uName/:lName',
				component: CustomerManageSerchComponent
			},
			{
				path:'customer-manage-serch',
				component: CustomerManageSerchComponent
			},	
			]
		}
	]
