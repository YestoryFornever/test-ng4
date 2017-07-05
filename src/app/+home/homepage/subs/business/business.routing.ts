import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BondHelperRouting } from './bond-helper/bond-helper.routing';
export const BusinessRouting: Routes = [
	// {
	// 	path: 'bond-helper',
	// 	loadChildren: './bond-helper/bond-helper.module#BondHelperModule'
	// },
	...BondHelperRouting
];