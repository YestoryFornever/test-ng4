import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BondHelperListComponent } from './subs/bond-helper-list/bond-helper-list.component';
import { BondHelperDetailComponent } from './subs/bond-helper-detail/bond-helper-detail.component';
import { BondHelperCreateComponent } from './subs/bond-helper-create/bond-helper-create.component';
export const BondHelperRouting: Routes = [
	{
		path: 'bond-helper-list',
		component:BondHelperListComponent
	},
	{
		path: 'bond-helper-create',
		component: BondHelperCreateComponent
	},
	{
		path: 'bond-helper-detail',
		component: BondHelperDetailComponent
	},
];