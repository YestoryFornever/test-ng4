import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// CoinListComponent
import {CoinListComponent} from './subs/coin-list/coin-list.component'
import { CoinIssueComponent} from "./subs/coin-issue/coin-issue.component"
import { CoinGoldDetailComponent} from "./coin-gold-detail.component"
import { CoinPermissionsComponent } from './subs/coin-permissions/coin-permissions.component'

export const CoinGoldDetailRouting: Routes =[{
	path: 'coin-gold-detail',
	component: CoinGoldDetailComponent,
	children:[
		{
			path:'',
			redirectTo: 'coin-list', 
			pathMatch: 'full'
		},
		{
			path:'coin-issue',
			component: CoinIssueComponent
		},
		{
			path:'coin-list',
			component: CoinListComponent
		},
		{
			path:'coin-list/:phone',
			component: CoinListComponent
		},
		{
			path:'coin-permissions',
			component: CoinPermissionsComponent
		}					
		
	]
}]

