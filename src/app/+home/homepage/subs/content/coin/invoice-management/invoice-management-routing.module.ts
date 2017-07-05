import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InvoiceDetailsComponent } from'./subs/invoice-details/invoice-details.component';
import { InvoiceManagementComponent } from'./invoice-management.component';

export const InvoiceManagementRouting: Routes =[
	{
		path: 'invoice-management',
		component: InvoiceManagementComponent,
	},
	{
		path:'invoice-details/:invoiceId',
		component: InvoiceDetailsComponent
	},
	{
		path:'invoice-details',
		component: InvoiceDetailsComponent
	},
]

