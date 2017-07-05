import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BondDistributionComponent } from './bond-distribution.component'
import { BondDistributionListComponent } from './bond-distribution-management/bond-distribution-list/bond-distribution-list.component'
import { BondDetialComponent } from './bond-distribution-management/bond-detial/bond-detial.component'
import { BondDistributionPandectComponent } from './bond-distribution-management/bond-distribution-pandect/bond-distribution-pandect.component'
import { SubscribeDetialComponent } from './bond-distribution-management/subscribe-detial/subscribe-detial.component'
import { SubscribeDetialUserComponent } from './bond-distribution-management/user-subscribe-detial/user-subscribe-detial.component'
import { BondAnalysisList } from './bond-distribution-management/bond-analysis/bond-analysis-list/bond-analysis.component'
import { BondDictionaryManagement } from './bond-distribution-management/bond-analysis/bond-dictionary-management/bond-dictionary-management.component'
import { CheckOrgComponent } from './role-configuration/check-org/check-org.component'
import { RoleManagementComponent } from './role-configuration/role-management-list/role-management-list.component'
export const BondDistributionRouting: Routes =[{
	path: 'bond-distribution',
	component: BondDistributionComponent,
	children:[
		{
			path:'',
			redirectTo: 'bond-distribution-list', 
			pathMatch: 'full'
		},
		{
			path:'bond-distribution-list',
			component: BondDistributionListComponent
		},{
			path:'bond-detial',//债券详情/:id
			component: BondDetialComponent
		},{
			path:'bond-detial/:dstrBondId/:issuId/:enqrTp',//债券详情/:id
			component: BondDetialComponent
		},{
			path:'bond-distribution-pandect',
			component: BondDistributionPandectComponent
		},{
			path:'subscribe-detial-user/:dstrBondId/:issuId/:userId/:teamId/:obTeamId/:roleId/:enqrTp',
			component: SubscribeDetialUserComponent
		},{
			path:'subscribe-detial-user',//用户申购详情/:dstrBondId/:issuId
			component: SubscribeDetialUserComponent
		},{
			path:'subscribe-detial/:dstrBondId/:issuId/:enqrTp',//申购详情
			component: SubscribeDetialComponent
		},{
			path:'subscribe-detial',//申购详情
			component: SubscribeDetialComponent
		},{
			path:'check-org/:id/:orgName',
			component: CheckOrgComponent
		},{
			path:'role-management',
			component: RoleManagementComponent
		},{
			path:'bond-analysis',
			component: BondAnalysisList
		},{
			path:'bond-distribution-management',
			component: BondDictionaryManagement
		}
	]
}]